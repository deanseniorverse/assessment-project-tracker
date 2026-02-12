import { describe, it, expect, beforeEach } from "vitest";
import { CoreStore } from "@packages/core/src/stores/CoreStore";
import { ProjectFormState } from "@packages/core/src/forms/ProjectFormState";
import type { CoreStoreType } from "@packages/core/src/stores/CoreTypes";

/**
 * Module D: ProjectFormState Tests
 *
 * INSTRUCTIONS:
 * 1. Write test cases for the ProjectFormState class
 * 2. Then implement ProjectFormState.ts to pass your tests
 *
 * You should write tests covering:
 * - action getter ('create' vs 'edit')
 * - project getter (returns model for edit mode)
 * - initialValues getter (default vs project values)
 * - validates getter (validation rules)
 * - handleSubmit method (create and update flows)
 *
 * EXAMPLE TEST STRUCTURE:
 *
 * describe("action getter", () => {
 *   it("returns 'create' when projectId is not set", () => {
 *     // Your test here
 *   });
 *
 *   it("returns 'edit' when projectId is set", () => {
 *     // Your test here
 *   });
 * });
 */

describe("ProjectFormState", () => {
  let store: CoreStoreType;

  beforeEach(() => {
    store = CoreStore();
  });

  // =============================================================================
  // TODO: Write your test cases below
  // =============================================================================

  describe("action getter", () => {
    // TODO: Write tests for the action getter
    // - Should return 'create' when projectId is not set
    // - Should return 'edit' when projectId is set

    it.todo("returns 'create' when projectId is not set");
    it.todo("returns 'edit' when projectId is set");
  });

  describe("project getter", () => {
    // TODO: Write tests for the project getter
    // - Should return undefined in create mode
    // - Should return the project model in edit mode

    it.todo("returns undefined when in create mode");
    it.todo("returns the project model when in edit mode");
  });

  describe("initialValues getter", () => {
    // TODO: Write tests for initialValues
    // - Should return defaults in create mode
    // - Should return project's values in edit mode

    it.todo("returns default values in create mode");
    it.todo("returns project values in edit mode");
  });

  describe("validates getter", () => {
    // TODO: Write tests for validation rules
    // - Name should be required
    // - Name should have minimum length
    // - Description should have maximum length
    // - Status should be valid enum

    it.todo("requires name field");
    it.todo("validates name minimum length");
    it.todo("validates description maximum length");
    it.todo("validates status is valid enum value");
  });

  describe("handleSubmit", () => {
    // TODO: Write tests for form submission
    // - Should create new project in create mode
    // - Should update existing project in edit mode
    // - Should set isSubmitting during async operation
    // - Should call onSuccess callback after completion

    it.todo("creates new project in create mode");
    it.todo("updates existing project in edit mode");
    it.todo("sets isSubmitting to true during submission");
    it.todo("sets isSubmitting to false after completion");
    it.todo("calls onSuccess callback after successful submission");
  });
});
