import { useState, useEffect } from "react";
import type {
  ViewTypeConstructor,
  ViewTypeProps,
  DataTypeConstructor,
  DataTypeProps,
} from "@packages/ui/src/stores/StoreTypes";

/**
 * useStateFocus - Hook for instantiating ViewType state classes
 *
 * This hook creates a single instance of a state class and keeps it
 * synchronized with incoming props data.
 *
 * Usage:
 * ```tsx
 * const state = useStateFocus({
 *   State: MyViewState,
 *   props: { store, data: { ... } }
 * });
 * ```
 */
export const useStateFocus = <ViewState extends ViewTypeConstructor>({
  State,
  props,
}: {
  State: ViewState;
  props: ViewTypeProps;
}) => {
  const [state] = useState(() => new State(props));

  useEffect(() => {
    state?.load(props.data);
  }, [state, props.data]);

  return state as InstanceType<ViewState>;
};

/**
 * useDataFocus - Hook for instantiating DataType state classes (no store needed)
 */
export const useDataFocus = <DataState extends DataTypeConstructor>({
  State,
  props,
}: {
  State: DataState;
  props: DataTypeProps;
}) => {
  const [state] = useState(() => new State(props));

  useEffect(() => {
    state?.load(props.data);
  }, [state, props.data]);

  return state as InstanceType<DataState>;
};
