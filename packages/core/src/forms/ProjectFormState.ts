import { makeAutoObservable, toJS, set } from "mobx";
import { save, checkAttrs } from "@packages/ui/src/utils/data";
import type {
  ViewType,
  ViewTypeProps,
  Raw,
} from "@packages/ui/src/stores/StoreTypes";
import type {
  CoreStoreType,
  ProjectType,
  ProjectAttributes,
} from "../stores/CoreTypes";
import type { FormikProps } from "formik";

// =============================================================================
// MODULE D: Form State (Candidate writes tests + implements)
// =============================================================================

/**
 * ProjectFormState - Form state for creating/editing projects
 *
 * This module is different from A, B, C:
 * 1. First, write test cases in tests/ProjectFormState.test.ts
 * 2. Then, implement this class to pass your tests
 *
 * REQUIREMENTS:
 *
 * 1. action (get): Determine if this is a 'create' or 'edit' operation
 *    - If data.projectId exists, return 'edit'
 *    - Otherwise, return 'create'
 *
 * 2. project (get): Return the project being edited (undefined for create)
 *    - Use store.model.project.getModel(data.projectId)
 *
 * 3. initialValues (get): Return initial form values
 *    - For 'create': return default values { name: '', description: '', status: 'active' }
 *    - For 'edit': return the project's current attributes
 *
 * 4. validates (get): Return Yup validation schema or validation rules
 *    - name: required, min 3 characters
 *    - description: optional, max 500 characters
 *    - status: must be one of 'active', 'completed', 'archived'
 *
 * 5. handleSubmit(values): Process form submission
 *    - For 'create': create new project in store
 *    - For 'edit': update existing project
 *    - Set isSubmitting during async operation
 *    - Call onSuccess callback if provided
 *
 * HINTS:
 * - This follows the same ViewType pattern as TaskCardState
 * - The formik property can store a reference to the Formik instance
 * - Use store.model.project.create() for new projects
 * - Use project.save() for updates
 */

// =============================================================================
// TYPES
// =============================================================================

export interface ProjectFormData {
  projectId?: string;
  isSubmitting?: boolean;
  Show?: boolean;
  onSuccess?: () => void;
}

export interface ProjectFormValues {
  name: string;
  description: string;
  status: ProjectAttributes["status"];
}

// =============================================================================
// STATE CLASS
// =============================================================================

export class ProjectFormState implements ViewType<CoreStoreType> {
  store: CoreStoreType;
  data: ProjectFormData = {};
  sendAttrs: string[];
  sendAttr?: (attr: string, value: any) => void;

  // Formik reference (optional - for advanced integration)
  formik?: FormikProps<ProjectFormValues>;

  constructor(props: ViewTypeProps) {
    this.store = props.store as CoreStoreType;
    this.sendAttrs = props.sendAttrs || [];
    this.sendAttr = props.sendAttr;

    if (props.data) {
      this.load(props.data);
    }

    // TODO: Initialize with makeAutoObservable
  }

  // =============================================================================
  // ViewType Interface (implement these like TaskCardState)
  // =============================================================================

  get json(): Raw {
    return toJS(this.data);
  }

  inAttr(attr: string, value: any): void {
    set(this.data, attr, value);
  }

  setAttr(attr: string, value: any): void {
    if (this.sendAttr && checkAttrs(this.sendAttrs, attr)) {
      this.sendAttr(attr, value);
    } else {
      this.inAttr(attr, value);
    }
  }

  save(values: any): void {
    save({
      data: this.data,
      values,
      setAttr: (attr, value) => this.setAttr(attr, value),
    });
  }

  load(values: any): void {
    save({
      data: this.data,
      values,
      setAttr: (attr, value) => this.inAttr(attr, value),
    });
  }

  // =============================================================================
  // Form-Specific Properties (TODO: implement these)
  // =============================================================================

  // TODO: Implement action getter
  get action(): "create" | "edit" {
    // Return 'edit' if projectId exists, otherwise 'create'
    return "create";
  }

  // TODO: Implement project getter
  get project(): ProjectType | undefined {
    // Return the project being edited
    return undefined;
  }

  // TODO: Implement initialValues getter
  get initialValues(): ProjectFormValues {
    // Return initial form values based on action
    return {
      name: "",
      description: "",
      status: "active",
    };
  }

  // TODO: Implement validates getter (return validation rules object)
  get validates() {
    // Return validation rules
    // Can be a Yup schema or a simple rules object
    return {
      name: {
        required: true,
        minLength: 3,
      },
      description: {
        maxLength: 500,
      },
      status: {
        oneOf: ["active", "completed", "archived"],
      },
    };
  }

  // TODO: Implement handleSubmit method
  async handleSubmit(values: ProjectFormValues): Promise<void> {
    // Set submitting state
    // Create or update project
    // Call onSuccess if provided
  }
}
