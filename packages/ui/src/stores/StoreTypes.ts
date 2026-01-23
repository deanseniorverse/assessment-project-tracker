/**
 * Store Types - Simplified for Assessment
 *
 * This file contains the core type definitions for the MobX store system.
 * Candidates should understand and implement classes that conform to these interfaces.
 */

// =============================================================================
// STORE TYPES
// =============================================================================

export type StoreType<Models = any, Services = any> = {
  name: string;
  model: StoreModelsType<Models>;
  services?: Services;
  booted: boolean;
};

export type StoreModelsType<Models = any> = Models & {
  [name: string]: CollectionType;
};

export type StoreConfig = {
  models?: {
    [name: string]: ModelConfig;
  };
};

export type ModelConfig = {
  attributes?: AttributesType;
  relations?: {
    [name: string]: {
      pivot: string;
      to: string;
      from?: string;
    };
  };
  pk?: {
    [attr: string]: string;
  };
};

export type AttributesType<T = any> = T & {
  [name: string]: any;
};

// =============================================================================
// COLLECTION TYPES
// =============================================================================

export type CollectionType<Model = any, Extend = any> = {
  name: string;
  store: StoreType;
  collection: { [id: string]: Raw };
  ext?: Extend;
  ids: string[];
  all: Model[];
  values: Raw[];
  getModel: (id: string) => Model | undefined;
  getModels: (ids: string[]) => Model[];
  find: (filter: (raw: Raw) => boolean) => Model | undefined;
  filter: (filter: (raw: Raw) => boolean) => Model[];
  create: (attributes: Raw) => Model;
  _add: (record: Raw) => Model;
  _update: (record: Raw) => void;
  _remove: (id: string) => void;
  get json(): { [id: string]: Raw };
};

export interface CollectionExtendProps {
  store: StoreType;
  collection: CollectionType;
}

export interface CollectionExtendConstructor {
  new (props: CollectionExtendProps): CollectionExtend;
}

export interface CollectionExtend<Store = StoreType, Collection = CollectionType> {
  store: Store;
  collection: Collection;
}

// =============================================================================
// MODEL TYPES
// =============================================================================

export type ModelType<Attributes = any, Extend = any> = {
  id: string;
  name: string;
  store: StoreType;
  collection: CollectionType;
  attr: Raw<Attributes>;
  ext?: Extend;
  save: (values: Partial<Attributes>) => void;
  get json(): Raw<Attributes>;
};

export interface ModelExtendProps {
  store: StoreType;
  model: ModelType;
}

export interface ModelExtendConstructor {
  new (props: ModelExtendProps): ModelExtend;
}

export interface ModelExtend<Store = StoreType, Model = ModelType> {
  store: Store;
  model: Model;
  [attr: string]: any;
}

// =============================================================================
// RAW DATA TYPE
// =============================================================================

export type Raw<T = any> = T & {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  [attribute: string]: any;
};

// =============================================================================
// VIEW STATE TYPES
// =============================================================================

/**
 * ViewType - For view states that need store access
 *
 * This is the primary interface for managing UI state in components.
 * Candidates must implement classes that conform to this interface.
 */
export type ViewTypeProps = {
  store: StoreType;
  data: Raw;
  sendAttrs?: string[];
  sendAttr?: (attr: string, value: any) => void;
};

export interface ViewTypeConstructor {
  new (props: ViewTypeProps): ViewType;
}

export type ViewType<Store = StoreType> = {
  store: Store;
  data: Raw; // mobx observable
  sendAttrs: string[];
  setAttr: (attr: string, value: any) => void;
  inAttr: (attr: string, value: any) => void;
  save: (values: any) => void; // save to this.data
  get json(): Raw; // computed getter for serialization
  load: (values: any) => void; // initialize or replace data
};

/**
 * DataType - For simpler view states that don't need store access
 */
export type DataTypeProps = {
  data: Raw;
  sendAttrs?: string[];
  sendAttr?: (attr: string, value: any) => void;
};

export interface DataTypeConstructor {
  new (props: DataTypeProps): DataType;
}

export type DataType = {
  data: Raw; // mobx observable
  setAttr: (attr: string, value: any) => void;
  save: (values: any) => void;
  get json(): Raw;
  sendAttrs: string[];
  inAttr: (attr: string, value: any) => void;
  load: (values: any) => void;
};
