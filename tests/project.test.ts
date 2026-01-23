import { describe, it, expect, beforeEach } from "vitest";
import { CoreStore } from "@packages/core/stores/CoreStore";
import type { CoreStoreType, ProjectType } from "@packages/core/stores/CoreTypes";

/**
 * Module B: Project Model Extension Tests
 *
 * These tests verify the ProjectExtend class implementation.
 * The candidate must implement stores/models/project.ts to pass these tests.
 */

describe("ProjectExtend", () => {
  let store: CoreStoreType;
  let project: ProjectType;

  beforeEach(() => {
    store = CoreStore();

    // Create a test project
    project = store.model.project.create({
      name: "Test Project",
      description: "A test project",
      status: "active",
    });
  });

  describe("displayName", () => {
    it("returns the project name when name exists", () => {
      expect(project.ext?.displayName).toBe("Test Project");
    });

    it("returns 'Untitled Project' when name is empty", () => {
      const emptyProject = store.model.project.create({
        name: "",
        status: "active",
      });
      expect(emptyProject.ext?.displayName).toBe("Untitled Project");
    });

    it("returns 'Untitled Project' when name is undefined", () => {
      const noNameProject = store.model.project.create({
        status: "active",
      });
      expect(noNameProject.ext?.displayName).toBe("Untitled Project");
    });
  });

  describe("tasks", () => {
    it("returns empty array when project has no tasks", () => {
      expect(project.ext?.tasks).toEqual([]);
    });

    it("returns array of tasks belonging to the project", () => {
      // Create tasks for this project
      store.model.task.create({
        projectId: project.id,
        title: "Task 1",
        status: "todo",
        priority: "high",
      });

      store.model.task.create({
        projectId: project.id,
        title: "Task 2",
        status: "in-progress",
        priority: "medium",
      });

      expect(project.ext?.tasks.length).toBe(2);
    });

    it("does not include tasks from other projects", () => {
      const otherProject = store.model.project.create({
        name: "Other Project",
        status: "active",
      });

      store.model.task.create({
        projectId: project.id,
        title: "Task for first project",
        status: "todo",
        priority: "high",
      });

      store.model.task.create({
        projectId: otherProject.id,
        title: "Task for other project",
        status: "todo",
        priority: "high",
      });

      expect(project.ext?.tasks.length).toBe(1);
      expect(project.ext?.tasks[0].attr.title).toBe("Task for first project");
    });
  });

  describe("taskCount", () => {
    it("returns 0 when project has no tasks", () => {
      expect(project.ext?.taskCount).toBe(0);
    });

    it("returns correct count of tasks", () => {
      store.model.task.create({
        projectId: project.id,
        title: "Task 1",
        status: "todo",
        priority: "high",
      });

      store.model.task.create({
        projectId: project.id,
        title: "Task 2",
        status: "done",
        priority: "low",
      });

      store.model.task.create({
        projectId: project.id,
        title: "Task 3",
        status: "in-progress",
        priority: "medium",
      });

      expect(project.ext?.taskCount).toBe(3);
    });
  });

  describe("progress", () => {
    it("returns 0 when project has no tasks", () => {
      expect(project.ext?.progress).toBe(0);
    });

    it("returns 0 when no tasks are completed", () => {
      store.model.task.create({
        projectId: project.id,
        title: "Task 1",
        status: "todo",
        priority: "high",
      });

      store.model.task.create({
        projectId: project.id,
        title: "Task 2",
        status: "in-progress",
        priority: "medium",
      });

      expect(project.ext?.progress).toBe(0);
    });

    it("returns 100 when all tasks are completed", () => {
      store.model.task.create({
        projectId: project.id,
        title: "Task 1",
        status: "done",
        priority: "high",
      });

      store.model.task.create({
        projectId: project.id,
        title: "Task 2",
        status: "done",
        priority: "low",
      });

      expect(project.ext?.progress).toBe(100);
    });

    it("returns correct percentage for partial completion", () => {
      store.model.task.create({
        projectId: project.id,
        title: "Task 1",
        status: "done",
        priority: "high",
      });

      store.model.task.create({
        projectId: project.id,
        title: "Task 2",
        status: "todo",
        priority: "low",
      });

      store.model.task.create({
        projectId: project.id,
        title: "Task 3",
        status: "in-progress",
        priority: "medium",
      });

      store.model.task.create({
        projectId: project.id,
        title: "Task 4",
        status: "done",
        priority: "medium",
      });

      // 2 out of 4 = 50%
      expect(project.ext?.progress).toBe(50);
    });
  });
});

describe("ProjectCollectionExtend", () => {
  let store: CoreStoreType;

  beforeEach(() => {
    store = CoreStore();

    // Create projects with different statuses
    store.model.project.create({
      name: "Active Project 1",
      status: "active",
    });

    store.model.project.create({
      name: "Active Project 2",
      status: "active",
    });

    store.model.project.create({
      name: "Completed Project",
      status: "completed",
    });

    store.model.project.create({
      name: "Archived Project",
      status: "archived",
    });
  });

  describe("activeProjects", () => {
    it("returns only active projects", () => {
      const activeProjects = store.model.project.ext?.activeProjects;
      expect(activeProjects?.length).toBe(2);
      expect(activeProjects?.every((p) => p.attr.status === "active")).toBe(true);
    });
  });

  describe("completedProjects", () => {
    it("returns only completed projects", () => {
      const completedProjects = store.model.project.ext?.completedProjects;
      expect(completedProjects?.length).toBe(1);
      expect(completedProjects?.[0].attr.status).toBe("completed");
    });
  });

  describe("getByStatus", () => {
    it("returns projects filtered by status", () => {
      const archived = store.model.project.ext?.getByStatus("archived");
      expect(archived?.length).toBe(1);
      expect(archived?.[0].attr.name).toBe("Archived Project");
    });

    it("returns empty array when no projects match status", () => {
      // Create a fresh store with no projects of a certain status
      const freshStore = CoreStore();
      freshStore.model.project.create({
        name: "Only Active",
        status: "active",
      });

      const archived = freshStore.model.project.ext?.getByStatus("archived");
      expect(archived?.length).toBe(0);
    });
  });
});
