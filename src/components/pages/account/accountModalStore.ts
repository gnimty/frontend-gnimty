import { createStore } from 'zustand';

import createSSRStore from '@/utils/createSSRStore';

type AccountPage = 'LOGIN' | 'SIGNUP' | 'FIND_PW' | 'TERMS' | 'SUCCESS' | 'SET_PW';

interface AccountModalState {
  isOpen: boolean;
  currentPage: AccountPage;
}

interface AccountModalActions {
  open: () => void;
  close: () => void;
  setCurrentPage: (newPage: AccountPage) => void;
}

export type AccountModalStore = AccountModalState & AccountModalActions;

const defaultInitState: AccountModalState = {
  isOpen: false,
  currentPage: 'LOGIN',
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
    setCurrentPage: (newPage: AccountPage) => {
      set({ currentPage: newPage });
    },
  }));

const [AccountModalStoreProvider, useAccountModalStore] = createSSRStore(createAccountModalStore);

export { AccountModalStoreProvider, useAccountModalStore };
