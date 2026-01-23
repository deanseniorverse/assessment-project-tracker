import { makeAutoObservable } from "mobx";
import { computedFn } from "mobx-utils";
import type {
  ModelExtend,
  ModelExtendProps,
  CollectionExtend,
  CollectionExtendProps,
} from "@packages/ui/src/stores/StoreTypes";
import type {
  CoreStoreType,
  ProjectType,
  ProjectAttributes,
  TaskType,
} from "../CoreTypes";

// =============================================================================
// MODULE B: Model Extension
// =============================================================================

/**
 * ProjectExtend - Extension class for Project models
 *
 * TODO: Implement the following computed properties:
 *
 * 1. displayName (get): Returns the project name, or "Untitled Project" if empty
 *
 * 2. tasks (get): Returns an array of Task models that belong to this project
 *    - Filter tasks from store.model.task where task.projectId === this.model.id
 *
 * 3. taskCount (get): Returns the total number of tasks
 *
 * 4. progress (get): Returns the percentage of completed tasks (0-100)
 *    - Count tasks with status === "done"
 *    - If no tasks, return 0
 *    - Formula: (completedTasks / totalTasks) * 100
 *
 * HINTS:
 * - Use makeAutoObservable(this, { store: false, model: false })
 * - Access model attributes via this.model.attr
 * - Access the task collection via this.store.model.task
 * - Use the collection's filter() method to find related tasks
 *
 * See Button.tsx in packages/ui for reference on the patterns used.
 */
export class ProjectExtend implements ModelExtend {
  store: CoreStoreType;
  model: ProjectType;

  constructor(props: ModelExtendProps) {
    this.store = props.store as CoreStoreType;
    this.model = props.model as ProjectType;

    // TODO: Initialize with makeAutoObservable
    // Remember to exclude store and model from being made observable
  }

  // TODO: Implement displayName getter

  // TODO: Implement tasks getter

  // TODO: Implement taskCount getter

  // TODO: Implement progress getter
}

// =============================================================================
// BONUS: Collection Extension
// =============================================================================

/**
 * ProjectCollectionExtend - Extension class for Project collection
 *
 * TODO (BONUS): Implement the following:
 *
 * 1. activeProjects (get): Returns projects with status === "active"
 * 2. completedProjects (get): Returns projects with status === "completed"
 * 3. getByStatus(status): Returns projects filtered by the given status
 *
 * HINTS:
 * - Use computedFn for methods that take parameters
 * - Use this.collection.filter() to filter projects
 */
export class ProjectCollectionExtend implements CollectionExtend {
  store: CoreStoreType;
  collection: any; // ProjectCollectionType

  constructor(props: CollectionExtendProps) {
    this.store = props.store as CoreStoreType;
    this.collection = props.collection;

    // TODO: Initialize with makeAutoObservable
  }

  // TODO: Implement activeProjects getter

  // TODO: Implement completedProjects getter

  // TODO: Implement getByStatus method using computedFn
}
