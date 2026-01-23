import { ReactNode } from "react";

export interface ViewVariantsProps {
  current: string;
  views: { [name: string]: ReactNode };
}

/**
 * ViewVariants - Simple view switching component
 *
 * Used with view state to render different views based on current state.
 *
 * Usage:
 * ```tsx
 * <ViewVariants
 *   current={state.view}
 *   views={{
 *     loading: <LoadingView />,
 *     error: <ErrorView />,
 *     content: <ContentView />
 *   }}
 * />
 * ```
 */
export const ViewVariants = (props: ViewVariantsProps) => {
  const { current, views } = props;
  return views?.[current] || null;
};

export default ViewVariants;
