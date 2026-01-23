import { View, Text } from "react-native";
import {
  createVariants,
  Styles,
  Selected,
} from "@packages/ui/src/utils/variants";

// =============================================================================
// MODULE A: UI Components with Variants
// =============================================================================

/**
 * StatusBadge - A badge component showing task/project status
 *
 * TODO: Implement this component using the createVariants pattern.
 *
 * REQUIREMENTS:
 * 1. Accept status prop: 'todo' | 'in-progress' | 'done'
 * 2. Accept optional variants prop with size: 'sm' | 'base' | 'lg'
 * 3. Accept optional styles prop for external overrides
 *
 * STYLING:
 * - Map status to theme colors:
 *   - 'todo' -> neutral/gray background
 *   - 'in-progress' -> primary/blue background
 *   - 'done' -> success/green background
 *
 * - Map size to dimensions:
 *   - 'sm' -> smaller padding, text-xs
 *   - 'base' -> medium padding, text-sm
 *   - 'lg' -> larger padding, text-base
 *
 * HINTS:
 * - Study Button.tsx in packages/ui for the createVariants pattern
 * - Use cn() function returned by createVariants
 * - Use View for container and Text for the status label
 * - Convert status to display text (e.g., 'in-progress' -> 'In Progress')
 *
 * EXAMPLE USAGE:
 * ```tsx
 * <StatusBadge status="in-progress" />
 * <StatusBadge status="done" variants={{ size: 'lg' }} />
 * <StatusBadge status="todo" styles={{ badge: 'shadow-md' }} />
 * ```
 */

// =============================================================================
// TYPES
// =============================================================================

export type StatusType = "todo" | "in-progress" | "done";

export interface StatusBadgeStyles {
  badge?: string;
  text?: string;
}

export interface StatusBadgeVariants {
  size?: "sm" | "base" | "lg";
}

export interface StatusBadgeProps {
  status: StatusType;
  styles?: StatusBadgeStyles;
  variants?: StatusBadgeVariants;
  testID?: string;
}

// =============================================================================
// HELPER FUNCTION
// =============================================================================

/**
 * Convert status to display text
 */
const getStatusLabel = (status: StatusType): string => {
  const labels: Record<StatusType, string> = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done",
  };
  return labels[status];
};

// =============================================================================
// COMPONENT
// =============================================================================

export const StatusBadge = (props: StatusBadgeProps) => {
  const { status, styles = {}, variants = {}, testID } = props;

  // TODO: Implement using createVariants pattern
  //
  // 1. Define selected variants with defaults
  // 2. Map status to a 'theme' variant for color
  // 3. Create variant resolver with createVariants()
  // 4. Use cn() for className composition
  //
  // Your implementation here:

  return (
    <View testID={testID}>
      <Text>{getStatusLabel(status)}</Text>
    </View>
  );
};

export default StatusBadge;
