import { useContext, createContext } from "react";
import type { StoreType } from "./StoreTypes";

const StoreContext = createContext<null | StoreType>(null);
export const ContextProvider = StoreContext.Provider;

export function useStoreContext<Store = StoreType>(): Store & StoreType {
  const store = useContext(StoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store as Store & StoreType;
}
