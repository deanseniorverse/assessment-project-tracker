import type {
  StoreType,
  CollectionType,
  ModelType,
  ModelExtend,
  CollectionExtend,
} from "@packages/ui/src/stores/StoreTypes";

// =============================================================================
// DOMAIN TYPES
// =============================================================================

/**
 * Project - A container for related tasks
 */
export interface ProjectAttributes {
  id: string;
  name: string;
  description?: string;
  status: "active" | "completed" | "archived";
  createdAt: string;
  updatedAt: string;
}

/**
 * Task - A single unit of work within a project
 */
export interface TaskAttributes {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

// =============================================================================
// EXTENSION INTERFACES (Candidates implement these)
// =============================================================================

/**
 * ProjectExtend - Extension interface for Project models
 *
 * Candidates must implement a class conforming to this interface
 * with the following computed properties:
 * - displayName: formatted name for display
 * - progress: percentage of completed tasks (0-100)
 * - taskCount: total number of tasks
 * - tasks: array of related Task models
 */
export interface ProjectExtend extends ModelExtend {
  readonly displayName: string;
  readonly progress: number;
  readonly taskCount: number;
  readonly tasks: TaskType[];
}

/**
 * ProjectCollectionExtend - Extension interface for Project collection
 *
 * Candidates must implement computed properties and methods for filtering
 */
export interface ProjectCollectionExtend extends CollectionExtend {
  readonly activeProjects: ProjectType[];
  readonly completedProjects: ProjectType[];
  getByStatus: (status: ProjectAttributes["status"]) => ProjectType[];
}

// =============================================================================
// MODEL TYPES
// =============================================================================

export type ProjectType = ModelType<ProjectAttributes, ProjectExtend>;
export type TaskType = ModelType<TaskAttributes>;

export type ProjectCollectionType = CollectionType<
  ProjectType,
  ProjectCollectionExtend
>;
export type TaskCollectionType = CollectionType<TaskType>;

// =============================================================================
// STORE TYPE
// =============================================================================

export interface CoreStoreModels {
  project: ProjectCollectionType;
  task: TaskCollectionType;
}

export type CoreStoreType = StoreType<CoreStoreModels>;
