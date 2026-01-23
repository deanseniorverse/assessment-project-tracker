import { makeAutoObservable, toJS, set } from "mobx";
import type {
  StoreType,
  CollectionType,
  ModelType,
  ModelExtendConstructor,
  ModelConfig,
  Raw,
} from "./StoreTypes";

export interface ModelConstructor {
  store: StoreType;
  collection: CollectionType;
  name: string;
  id: string;
  config: ModelConfig;
  extend?: ModelExtendConstructor;
}

/**
 * Model - Represents a single entity in a Collection
 *
 * Models provide a reactive interface to entity data.
 * They support extensions for adding computed properties and methods.
 */
export class Model<Attributes = any, Extend = any>
  implements ModelType<Attributes, Extend>
{
  store: StoreType;
  collection: CollectionType;
  name: string;
  id: string;
  config: ModelConfig;
  ext?: Extend;

  constructor(props: ModelConstructor) {
    this.store = props.store;
    this.collection = props.collection;
    this.name = props.name;
    this.id = props.id;
    this.config = props.config;

    // Initialize extension
    if (props.extend) {
      this.ext = new props.extend({
        store: this.store,
        model: this as any,
      }) as Extend;
    }

    makeAutoObservable(this, {
      store: false,
      collection: false,
      name: false,
      id: false,
      config: false,
      ext: false,
    });
  }

  /**
   * Get the model's attributes from the collection
   *
   * This is a computed property that returns the raw data
   * from the parent collection, ensuring reactivity.
   */
  get attr(): Raw<Attributes> {
    return (this.collection.collection[this.id] || {}) as Raw<Attributes>;
  }

  /**
   * Get attributes as plain JSON
   */
  get json(): Raw<Attributes> {
    return toJS(this.attr);
  }

  /**
   * Save/update attributes on the model
   */
  save(values: Partial<Attributes>): void {
    const record = { id: this.id, ...values } as Raw;
    this.collection._update(record);
  }
}
