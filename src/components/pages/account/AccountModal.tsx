import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { IconButton } from '@chakra-ui/react';

import Exit from '@/assets/icons/system/exit.svg';
import AccountModalBody from '@/components/pages/account/AccountModalBody';
import { AccountModalPageProvider } from '@/contexts/AccountModalPageContext';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const MAIL_CODE_CHECK_TIME = 180 as const; // 메일 인증 코드 대기 시간
export const MAIL_SEND_CHECK_TIME = 170 as const; // 메일을 받지 못했나요 메시지 렌더링 시간

export default function AccountModal({ isOpen, onClose }: AccountModalProps) {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent maxW="480px" maxH="760px" px="40px" py="60px" backgroundColor="white">
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
        <AccountModalPageProvider onClose={onClose}>
          <AccountModalBody />
        </AccountModalPageProvider>
      </ModalContent>
    </Modal>
  );
}
