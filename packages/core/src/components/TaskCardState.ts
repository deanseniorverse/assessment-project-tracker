import { makeAutoObservable, toJS, set } from "mobx";
import { save, checkAttrs } from "@packages/ui/src/utils/data";
import type {
  ViewType,
  ViewTypeProps,
  Raw,
} from "@packages/ui/src/stores/StoreTypes";
import type { CoreStoreType, TaskType } from "../stores/CoreTypes";

// =============================================================================
// MODULE C: View State Management
// =============================================================================

/**
 * TaskCardState - View state for the TaskCard component
 *
 * TODO: Implement the ViewType interface with the following:
 *
 * PROPERTIES:
 * - store: CoreStoreType - Reference to the store
 * - data: TaskCardData - Observable data object
 * - sendAttrs: string[] - Attributes to propagate to parent
 * - sendAttr?: function - Optional parent callback for propagation
 *
 * METHODS:
 * 1. inAttr(attr, value): Update a local attribute directly
 *    - Use MobX set() for nested path support
 *
 * 2. setAttr(attr, value): Update attribute with propagation check
 *    - If attr is in sendAttrs AND sendAttr exists, call sendAttr
 *    - Otherwise, call inAttr
 *
 * 3. save(values): Update multiple attributes at once
 *    - Use the save() utility from @packages/ui/src/utils/data
 *
 * 4. load(values): Replace/merge data from props
 *    - Update this.data with new values
 *
 * COMPUTED PROPERTIES:
 * 1. json (get): Return toJS(this.data) for serialization
 *
 * 2. view (get): Return the current view name based on data state
 *    - Return "loading" if data.isLoading is true
 *    - Return "editing" if data.isEditing is true
 *    - Return "expanded" if data.isExpanded is true
 *    - Return "default" otherwise
 *
 * 3. task (get): Return the Task model from the store
 *    - Use store.model.task.getModel(data.taskId)
 *
 * HINTS:
 * - Use makeAutoObservable(this, { store: false })
 * - The checkAttrs utility helps determine if attr should propagate
 * - See FormCreateEditState.tsx in the original repo for reference
 */

// =============================================================================
// TYPES
// =============================================================================

export interface TaskCardData {
  taskId?: string;
  projectId?: string;
  isLoading?: boolean;
  isEditing?: boolean;
  isExpanded?: boolean;
}

// =============================================================================
// STATE CLASS
// =============================================================================

export class TaskCardState implements ViewType<CoreStoreType> {
  store: CoreStoreType;
  data: TaskCardData = {};
  sendAttrs: string[];
  sendAttr?: (attr: string, value: any) => void;

  constructor(props: ViewTypeProps) {
    this.store = props.store as CoreStoreType;
    this.sendAttrs = props.sendAttrs || [];
    this.sendAttr = props.sendAttr;

    // Load initial data if provided
    if (props.data) {
      this.load(props.data);
    }

    // TODO: Initialize with makeAutoObservable
    // Remember to exclude 'store' from being observable
  }

  // TODO: Implement json getter
  get json(): Raw {
    // Return serialized data
    return {};
  }

  // TODO: Implement view getter
  get view(): string {
    // Return current view based on data state
    return "default";
  }

  // TODO: Implement task getter
  get task(): TaskType | undefined {
    // Return the task model from the store
    return undefined;
  }

  // TODO: Implement inAttr method
  inAttr(attr: string, value: any): void {
    // Update local attribute directly
  }

  // TODO: Implement setAttr method
  setAttr(attr: string, value: any): void {
    // Update attribute with propagation check
  }

  // TODO: Implement save method
  save(values: any): void {
    // Update multiple attributes
  }

  // TODO: Implement load method
  load(values: any): void {
    // Replace/merge data from props
  }

  // =============================================================================
  // ACTION METHODS (bonus - implement if time permits)
  // =============================================================================

  toggleExpand(): void {
    this.save({ isExpanded: !this.data.isExpanded });
  }

  startEditing(): void {
    this.save({ isEditing: true });
  }

  stopEditing(): void {
    this.save({ isEditing: false });
  }
}
