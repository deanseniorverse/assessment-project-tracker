import { describe, it, expect, beforeEach, vi } from "vitest";
import { CoreStore } from "@packages/core/src/stores/CoreStore";
import { TaskCardState } from "@packages/core/src/components/TaskCardState";
import type { CoreStoreType } from "@packages/core/src/stores/CoreTypes";

/**
 * Module C: TaskCardState Tests
 *
 * These tests verify the TaskCardState view state implementation.
 * The candidate must implement TaskCardState.ts to pass these tests.
 */

describe("TaskCardState", () => {
  let store: CoreStoreType;

  beforeEach(() => {
    store = CoreStore();
  });

  describe("initialization", () => {
    it("initializes with default empty data", () => {
      const state = new TaskCardState({
        store,
        data: {},
      });

      expect(state.data).toEqual({});
    });

    it("initializes with provided data", () => {
      const state = new TaskCardState({
        store,
        data: {
          taskId: "task-123",
          projectId: "project-456",
          isExpanded: true,
        },
      });

      expect(state.data.taskId).toBe("task-123");
      expect(state.data.projectId).toBe("project-456");
      expect(state.data.isExpanded).toBe(true);
    });

    it("sets sendAttrs from props", () => {
      const state = new TaskCardState({
        store,
        data: {},
        sendAttrs: ["taskId", "isExpanded"],
      });

      expect(state.sendAttrs).toEqual(["taskId", "isExpanded"]);
    });

    it("sets sendAttr callback from props", () => {
      const sendAttr = vi.fn();
      const state = new TaskCardState({
        store,
        data: {},
        sendAttr,
      });

      expect(state.sendAttr).toBe(sendAttr);
    });
  });

  describe("inAttr", () => {
    it("updates a local attribute directly", () => {
      const state = new TaskCardState({
        store,
        data: {},
      });

      state.inAttr("taskId", "new-task-id");
      expect(state.data.taskId).toBe("new-task-id");
    });

    it("updates nested attributes", () => {
      const state = new TaskCardState({
        store,
        data: {},
      });

      state.inAttr("isLoading", true);
      expect(state.data.isLoading).toBe(true);
    });
  });

  describe("setAttr", () => {
    it("updates local state when attr is not in sendAttrs", () => {
      const sendAttr = vi.fn();
      const state = new TaskCardState({
        store,
        data: {},
        sendAttrs: ["projectId"],
        sendAttr,
      });

      state.setAttr("taskId", "task-123");

      expect(state.data.taskId).toBe("task-123");
      expect(sendAttr).not.toHaveBeenCalled();
    });

    it("calls sendAttr when attr is in sendAttrs", () => {
      const sendAttr = vi.fn();
      const state = new TaskCardState({
        store,
        data: {},
        sendAttrs: ["projectId"],
        sendAttr,
      });

      state.setAttr("projectId", "project-123");

      expect(sendAttr).toHaveBeenCalledWith("projectId", "project-123");
    });

    it("updates locally when sendAttr is not provided", () => {
      const state = new TaskCardState({
        store,
        data: {},
        sendAttrs: ["projectId"],
        // No sendAttr callback
      });

      state.setAttr("projectId", "project-123");
      expect(state.data.projectId).toBe("project-123");
    });
  });

  describe("save", () => {
    it("updates multiple attributes at once", () => {
      const state = new TaskCardState({
        store,
        data: {},
      });

      state.save({
        taskId: "task-123",
        projectId: "project-456",
        isExpanded: true,
      });

      expect(state.data.taskId).toBe("task-123");
      expect(state.data.projectId).toBe("project-456");
      expect(state.data.isExpanded).toBe(true);
    });

    it("only updates changed values", () => {
      const state = new TaskCardState({
        store,
        data: {
          taskId: "task-123",
          isExpanded: false,
        },
      });

      // Saving the same value shouldn't trigger anything
      state.save({
        taskId: "task-123", // same value
        isExpanded: true, // changed value
      });

      expect(state.data.taskId).toBe("task-123");
      expect(state.data.isExpanded).toBe(true);
    });
  });

  describe("load", () => {
    it("replaces data from props", () => {
      const state = new TaskCardState({
        store,
        data: {
          taskId: "old-task",
        },
      });

      state.load({
        taskId: "new-task",
        projectId: "new-project",
      });

      expect(state.data.taskId).toBe("new-task");
      expect(state.data.projectId).toBe("new-project");
    });
  });

  describe("json getter", () => {
    it("returns serialized data", () => {
      const state = new TaskCardState({
        store,
        data: {
          taskId: "task-123",
          isExpanded: true,
        },
      });

      const json = state.json;
      expect(json.taskId).toBe("task-123");
      expect(json.isExpanded).toBe(true);
    });

    it("returns plain object (not observable)", () => {
      const state = new TaskCardState({
        store,
        data: {
          taskId: "task-123",
        },
      });

      const json = state.json;
      // toJS should return a plain object
      expect(typeof json).toBe("object");
    });
  });

  describe("view getter", () => {
    it("returns 'loading' when isLoading is true", () => {
      const state = new TaskCardState({
        store,
        data: { isLoading: true },
      });

      expect(state.view).toBe("loading");
    });

    it("returns 'editing' when isEditing is true", () => {
      const state = new TaskCardState({
        store,
        data: { isEditing: true },
      });

      expect(state.view).toBe("editing");
    });

    it("returns 'expanded' when isExpanded is true", () => {
      const state = new TaskCardState({
        store,
        data: { isExpanded: true },
      });

      expect(state.view).toBe("expanded");
    });

    it("returns 'default' when no flags are set", () => {
      const state = new TaskCardState({
        store,
        data: {},
      });

      expect(state.view).toBe("default");
    });

    it("prioritizes loading over editing", () => {
      const state = new TaskCardState({
        store,
        data: {
          isLoading: true,
          isEditing: true,
        },
      });

      expect(state.view).toBe("loading");
    });

    it("prioritizes editing over expanded", () => {
      const state = new TaskCardState({
        store,
        data: {
          isEditing: true,
          isExpanded: true,
        },
      });

      expect(state.view).toBe("editing");
    });
  });

  describe("task getter", () => {
    it("returns undefined when taskId is not set", () => {
      const state = new TaskCardState({
        store,
        data: {},
      });

      expect(state.task).toBeUndefined();
    });

    it("returns the task model when taskId exists", () => {
      const project = store.model.project.create({
        name: "Test Project",
        status: "active",
      });

      const task = store.model.task.create({
        projectId: project.id,
        title: "Test Task",
        status: "todo",
        priority: "high",
      });

      const state = new TaskCardState({
        store,
        data: { taskId: task.id },
      });

      expect(state.task).toBeDefined();
      expect(state.task?.attr.title).toBe("Test Task");
    });

    it("returns undefined when taskId does not match any task", () => {
      const state = new TaskCardState({
        store,
        data: { taskId: "non-existent-id" },
      });

      expect(state.task).toBeUndefined();
    });
  });

  describe("action methods", () => {
    it("toggleExpand toggles isExpanded state", () => {
      const state = new TaskCardState({
        store,
        data: { isExpanded: false },
      });

      state.toggleExpand();
      expect(state.data.isExpanded).toBe(true);

      state.toggleExpand();
      expect(state.data.isExpanded).toBe(false);
    });

    it("startEditing sets isEditing to true", () => {
      const state = new TaskCardState({
        store,
        data: {},
      });

      state.startEditing();
      expect(state.data.isEditing).toBe(true);
    });

    it("stopEditing sets isEditing to false", () => {
      const state = new TaskCardState({
        store,
        data: { isEditing: true },
      });

      state.stopEditing();
      expect(state.data.isEditing).toBe(false);
    });
  });
});
