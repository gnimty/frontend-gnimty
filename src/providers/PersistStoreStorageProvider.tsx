import { useContext, useEffect, type Context, type ReactNode } from 'react';

import type { Mutate, StoreApi } from 'zustand';

interface PersistStoreStorageProviderProps<T> {
  StoreContext: Context<Mutate<StoreApi<T>, [['zustand/persist', unknown]]>>;
  children?: ReactNode;
}

export default function PersistStoreStorageProvider<T>(props: PersistStoreStorageProviderProps<T>) {
  const { children, StoreContext } = props;

  const store = useContext(StoreContext);

  if (store === null) {
    throw new Error(`<PersistStoreStorageProvider>는 <StoreProviders>의 최심부에 감싸져 있어야 합니다.`);
  }

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (store.persist.getOptions().name !== undefined && e.newValue !== null) {
        store.persist.rehydrate();
      }
    };

    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, [store]);

  return <>{children}</>;
}
