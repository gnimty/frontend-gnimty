import { createContext, useContext, useRef, type ReactNode } from 'react';
import { useStore as useZustandStore } from 'zustand';

import type { StoreApi } from 'zustand';

export default function createSSRStore<S, State>(
  createStore: (initState?: State) => StoreApi<S>,
  initStore?: () => State,
) {
  const StoreContext = createContext<StoreApi<S> | null>(null);

  function StoreProvider(props: { children: ReactNode }) {
    const { children } = props;
    const storeRef = useRef<StoreApi<S>>();
    if (storeRef.current === undefined) {
      storeRef.current = createStore(initStore?.());
    }

    return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
  }

  function useStore<U>(selector: (state: S) => U): U {
    const store = useContext(StoreContext);

    if (store === null) {
      throw new Error(`useStore()는 <StoreProviders> 안에서만 실행시켜야 합니다.`);
    }

    return useZustandStore(store, selector);
  }

  return [StoreProvider, useStore, StoreContext] as const;
}
