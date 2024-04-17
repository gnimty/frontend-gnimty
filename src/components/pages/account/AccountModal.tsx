import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { IconButton } from '@chakra-ui/react';

import Exit from '@/assets/icons/system/exit.svg';
import AccountModalBody from '@/components/pages/account/AccountModalBody';
import { AccountModalPageProvider } from '@/contexts/AccountModalPageContext';

import { useAccountModalStore } from './accountModalStore';

export const MAIL_CODE_CHECK_TIME = 180 as const; // 메일 인증 코드 대기 시간
export const MAIL_SEND_CHECK_TIME = 170 as const; // 메일을 받지 못했나요 메시지 렌더링 시간

export default function AccountModal() {
  const isOpen = useAccountModalStore((s) => s.isOpen);
  const close = useAccountModalStore((s) => s.close);

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={close} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent maxW="480px" maxH="760px" px="40px" py="60px" backgroundColor="white">
        <IconButton
          position="absolute"
          w="32px"
          h="32px"
          top="24px"
          right="24px"
          aria-label="Close"
          onClick={close}
          icon={<Exit />}
        />
        <AccountModalPageProvider onClose={close}>
          <AccountModalBody />
        </AccountModalPageProvider>
      </ModalContent>
    </Modal>
  );
}
