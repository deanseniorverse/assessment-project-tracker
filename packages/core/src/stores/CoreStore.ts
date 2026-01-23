import { Store } from "@packages/ui/src/stores/Store";
import {
  ContextProvider,
  useStoreContext,
} from "@packages/ui/src/stores/Provider";
import type { CoreStoreType, CoreStoreModels } from "./CoreTypes";

// Import extensions (candidates implement these)
import { ProjectExtend } from "./models/project";
import { ProjectCollectionExtend } from "./models/project";

/**
 * Store Configuration
 *
 * Defines the models and their relationships.
 * This is provided to candidates - they don't need to modify this.
 */
const config = {
  models: {
    project: {
      attributes: {
        name: "",
        description: "",
        status: "active",
      },
      relations: {
        tasks: {
          pivot: "task",
          to: "projectId",
        },
      },
    },
    task: {
      attributes: {
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        projectId: "",
      },
      pk: {
        projectId: "project",
      },
    },
  },
};

/**
 * CoreStore Factory
 *
 * Creates a configured store instance with all models and extensions.
 */
export const CoreStore = () => {
  return new Store<CoreStoreModels>({
    name: "CoreStore",
    config,
    extend: {
      collection: {
        project: ProjectCollectionExtend,
      },
      model: {
        project: ProjectExtend,
      },
    },
  });
};

/**
 * Provider and Hook exports
 */
export const Provider = ContextProvider;
export const useStore = () => useStoreContext<CoreStoreType>();
