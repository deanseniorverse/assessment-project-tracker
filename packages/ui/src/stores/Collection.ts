import { makeAutoObservable, toJS, action } from "mobx";
import { computedFn } from "mobx-utils";
import { v4 as uuid } from "uuid";
import { Model } from "./Model";
import type {
  StoreType,
  CollectionType,
  CollectionExtendConstructor,
  ModelExtendConstructor,
  ModelConfig,
  Raw,
} from "./StoreTypes";

export interface CollectionConstructor {
  store: StoreType;
  name: string;
  model_config: {
    config: ModelConfig;
    extend?: ModelExtendConstructor;
  };
  extend?: CollectionExtendConstructor;
  collection?: { [id: string]: Raw };
}

/**
 * Collection - Manages a set of Model instances
 *
 * Collections provide methods for CRUD operations and querying models.
 * Each Collection is associated with a model type defined in the store config.
 */
export class Collection<ModelType = any, Extend = any>
  implements CollectionType<ModelType, Extend>
{
  store: StoreType;
  name: string;
  collection: { [id: string]: Raw } = {};
  model_config: CollectionConstructor["model_config"];
  ext?: Extend;

  constructor(props: CollectionConstructor) {
    this.store = props.store;
    this.name = props.name;
    this.model_config = props.model_config;

    if (props.collection) {
      this.collection = props.collection;
    }

    // Initialize extension
    if (props.extend) {
      this.ext = new props.extend({
        store: this.store,
        collection: this,
      }) as Extend;
    }

    makeAutoObservable(this, {
      store: false,
      name: false,
      model_config: false,
      ext: false,
      _add: action,
      _update: action,
      _remove: action,
    });
  }

  /**
   * Get all model IDs in the collection
   */
  get ids(): string[] {
    return Object.keys(this.collection);
  }

  /**
   * Get all models as an array
   */
  get all(): ModelType[] {
    return this.getModels(this.ids);
  }

  /**
   * Get all raw values
   */
  get values(): Raw[] {
    return Object.values(this.collection);
  }

  /**
   * Get collection as JSON (for serialization)
   */
  get json() {
    return toJS(this.collection);
  }

  /**
   * Get a single model by ID
   */
  getModel = computedFn((id: string): ModelType | undefined => {
    const attributes = this.collection[id];
    if (attributes) {
      return new Model({
        store: this.store,
        collection: this,
        name: this.name,
        id,
        config: this.model_config.config,
        extend: this.model_config.extend,
      }) as any as ModelType;
    }
    return undefined;
  });

  /**
   * Get multiple models by IDs
   */
  getModels(ids: string[]): ModelType[] {
    return ids
      .map((id) => this.getModel(id))
      .filter((model): model is ModelType => model !== undefined);
  }

  /**
   * Find a single model matching a filter
   */
  find = computedFn((filter: (raw: Raw) => boolean): ModelType | undefined => {
    const entry = Object.entries(this.collection).find(([_, raw]) => filter(raw));
    if (entry) {
      return this.getModel(entry[0]);
    }
    return undefined;
  });

  /**
   * Filter models matching a predicate
   */
  filter = computedFn((filter: (raw: Raw) => boolean): ModelType[] => {
    const ids = Object.entries(this.collection)
      .filter(([_, raw]) => filter(raw))
      .map(([id]) => id);
    return this.getModels(ids);
  });

  /**
   * Create a new model in the collection
   */
  create(attributes: Raw): ModelType {
    const now = new Date().toISOString();
    const data: Raw = {
      id: uuid(),
      createdAt: now,
      updatedAt: now,
      ...attributes,
    };
    return this._add(data);
  }

  /**
   * Internal: Add a record to the collection
   */
  _add(record: Raw): ModelType {
    const id = record.id!;
    this.collection[id] = record;
    return this.getModel(id)!;
  }

  /**
   * Internal: Update a record in the collection
   */
  _update(record: Raw): void {
    const id = record.id!;
    if (this.collection[id]) {
      this.collection[id] = {
        ...this.collection[id],
        ...record,
        updatedAt: new Date().toISOString(),
      };
    }
  }

  /**
   * Internal: Remove a record from the collection
   */
  _remove(id: string): void {
    delete this.collection[id];
  }
}
