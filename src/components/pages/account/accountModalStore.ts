import { createStore } from 'zustand';

import createSSRStore from '@/utils/createSSRStore';

interface AccountModalState {
  isOpen: boolean;
}

interface AccountModalActions {
  open: () => void;
  close: () => void;
}

export type AccountModalStore = AccountModalState & AccountModalActions;

const defaultInitState: AccountModalState = {
  isOpen: false,
};

const createAccountModalStore = (initState = defaultInitState) =>
  createStore<AccountModalStore>()((set) => ({
    ...initState,
    open: () => {
      set({ isOpen: true });
    },
    close: () => {
      set({ isOpen: false });
    },
  }));

const [AccountModalStoreProvider, useAccountModalStore] = createSSRStore(createAccountModalStore);

export { AccountModalStoreProvider, useAccountModalStore };
