import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "@packages/core/src/components/StatusBadge";

/**
 * Module A: StatusBadge Tests
 *
 * These tests verify the StatusBadge component implementation.
 * The candidate must implement StatusBadge.tsx to pass these tests.
 */

describe("StatusBadge", () => {
  describe("renders correct status text", () => {
    it("renders 'To Do' for todo status", () => {
      render(<StatusBadge status="todo" testID="badge" />);
      expect(screen.getByText("To Do")).toBeDefined();
    });

    it("renders 'In Progress' for in-progress status", () => {
      render(<StatusBadge status="in-progress" testID="badge" />);
      expect(screen.getByText("In Progress")).toBeDefined();
    });

    it("renders 'Done' for done status", () => {
      render(<StatusBadge status="done" testID="badge" />);
      expect(screen.getByText("Done")).toBeDefined();
    });
  });

  describe("applies correct theme based on status", () => {
    it("applies neutral/gray theme for todo status", () => {
      const { container } = render(
        <StatusBadge status="todo" testID="badge" />
      );
      const badge = container.querySelector('[data-testid="badge"]');
      // Check that gray/neutral colors are applied
      expect(badge?.className).toMatch(/bg-gray|bg-neutral/);
    });

    it("applies primary/blue theme for in-progress status", () => {
      const { container } = render(
        <StatusBadge status="in-progress" testID="badge" />
      );
      const badge = container.querySelector('[data-testid="badge"]');
      // Check that blue/primary colors are applied
      expect(badge?.className).toMatch(/bg-blue|bg-primary/);
    });

    it("applies success/green theme for done status", () => {
      const { container } = render(
        <StatusBadge status="done" testID="badge" />
      );
      const badge = container.querySelector('[data-testid="badge"]');
      // Check that green/success colors are applied
      expect(badge?.className).toMatch(/bg-green|bg-success/);
    });
  });

  describe("applies size variants", () => {
    it("applies small size when variants.size is 'sm'", () => {
      const { container } = render(
        <StatusBadge status="todo" variants={{ size: "sm" }} testID="badge" />
      );
      const badge = container.querySelector('[data-testid="badge"]');
      // Check for small text/padding classes
      expect(badge?.className).toMatch(/text-xs|px-1|px-2/);
    });

    it("applies base size by default", () => {
      const { container } = render(
        <StatusBadge status="todo" testID="badge" />
      );
      const badge = container.querySelector('[data-testid="badge"]');
      // Check for base text/padding classes
      expect(badge?.className).toMatch(/text-sm|px-2|px-3/);
    });

    it("applies large size when variants.size is 'lg'", () => {
      const { container } = render(
        <StatusBadge status="todo" variants={{ size: "lg" }} testID="badge" />
      );
      const badge = container.querySelector('[data-testid="badge"]');
      // Check for large text/padding classes
      expect(badge?.className).toMatch(/text-base|px-3|px-4/);
    });
  });

  describe("allows style overrides", () => {
    it("applies custom badge styles via styles prop", () => {
      const { container } = render(
        <StatusBadge
          status="todo"
          styles={{ badge: "shadow-lg" }}
          testID="badge"
        />
      );
      const badge = container.querySelector('[data-testid="badge"]');
      expect(badge?.className).toContain("shadow-lg");
    });

    it("applies custom text styles via styles prop", () => {
      const { container } = render(
        <StatusBadge
          status="todo"
          styles={{ text: "font-bold" }}
          testID="badge"
        />
      );
      const text = container
        .querySelector('[data-testid="badge"]')
        ?.querySelector("div");
      // This test assumes the text element receives the text style
      expect(text?.className || "").toContain("font-bold");
    });
  });
});
