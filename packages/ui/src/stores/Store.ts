import { makeAutoObservable } from "mobx";
import { Collection } from "./Collection";
import type {
  StoreType,
  StoreConfig,
  StoreModelsType,
  CollectionExtendConstructor,
  ModelExtendConstructor,
} from "./StoreTypes";

export interface StoreConstructor {
  name: string;
  config: StoreConfig;
  extend?: {
    collection?: { [name: string]: CollectionExtendConstructor };
    model?: { [name: string]: ModelExtendConstructor };
  };
  services?: (store: StoreType) => any;
}

/**
 * Store - Base store class for managing collections of models
 *
 * The Store class is the root of the state management hierarchy.
 * It manages multiple Collections, each containing Models.
 */
export class Store<Models = any, Services = any> implements StoreType<Models, Services> {
  name: string;
  config: StoreConfig;
  model: StoreModelsType<Models> = {} as StoreModelsType<Models>;
  services?: Services;
  booted: boolean = false;

  private extend?: StoreConstructor["extend"];

  constructor(props: StoreConstructor) {
    this.name = props.name;
    this.config = props.config;
    this.extend = props.extend;

    // Initialize collections for each model in config
    if (props.config.models) {
      for (const modelName in props.config.models) {
        const modelConfig = props.config.models[modelName];
        (this.model as any)[modelName] = new Collection({
          store: this,
          name: modelName,
          model_config: {
            config: modelConfig,
            extend: this.extend?.model?.[modelName],
          },
          extend: this.extend?.collection?.[modelName],
        });
      }
    }

    // Initialize services
    if (props.services) {
      this.services = props.services(this);
    }

    makeAutoObservable(this, {
      config: false,
      name: false,
      extend: false,
    });

    this.booted = true;
  }
}
