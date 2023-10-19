import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { IconButton } from '@chakra-ui/react';
import { createContext, useState } from 'react';

import Exit from '@/assets/icons/system/exit.svg';
import AccountModalBody from '@/components/pages/account/AccountModalBody';
import type { SignupFormData } from '@/components/pages/account/ModalBody/SignupModalBody';
import type { TermsType } from '@/constants/termsList';

import type { PropsWithChildren } from 'react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AccountPage = 'LOGIN' | 'SIGNUP' | 'FIND_PW' | 'POLICY';

type CurrentPageType = {
  page: AccountPage;
  signupFormData?: SignupFormData;
  termsData?: TermsType;
};

export const PageContext = createContext<{
  currentPage: CurrentPageType;
  setCurrentPage: (page: CurrentPageType) => void;
}>({ currentPage: { page: 'LOGIN' }, setCurrentPage: () => {} });

const PageProvider = ({ children }: PropsWithChildren) => {
  const [currentPage, setCurrentPage] = useState<CurrentPageType>({ page: 'LOGIN' });

  return <PageContext.Provider value={{ currentPage, setCurrentPage }}>{children}</PageContext.Provider>;
};

export default function AccountModal({ isOpen, onClose }: AccountModalProps) {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent maxW="480px" maxH="760px" pt="60px" pb="84px" backgroundColor="white">
        <IconButton
          position="absolute"
          w="32px"
          h="32px"
          top="24px"
          right="24px"
          aria-label="Close"
          onClick={onClose}
          icon={<Exit />}
        />
        <PageProvider>
          <AccountModalBody />
        </PageProvider>
      </ModalContent>
    </Modal>
  );
}
