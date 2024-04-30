import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  VStack,
  Text,
  Button,
  useBoolean,
  IconButton,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { changePassword } from '@/apis/queries/changepasswordQuery';
import Exit from '@/assets/icons/system/exit.svg';
import PasswordForm from '@/components/pages/account/ModalBody/InputForm/PasswordForm';
import { passwordRegex } from '@/utils/regex';

import type { UseDisclosureReturn } from '@chakra-ui/react';

interface ChangePasswordModalProps {
  disclosure: UseDisclosureReturn;
}

export default function ChangePasswordModal({ disclosure }: ChangePasswordModalProps) {
  const { mutateAsync: changePasswordAsync } = useMutation({
    mutationFn: changePassword,
  });
  const [showCurrentPassword, setShowCurrentPassword] = useBoolean(false);
  const [showNewPassword, setShowNewPassword] = useBoolean(false);
  const [showNewPasswordCheck, setShowNewPasswordCheck] = useBoolean(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const validAndSamePassword =
    passwordRegex.exec(newPassword) && passwordRegex.exec(newPasswordCheck) && newPassword === newPasswordCheck;
  const handlePasswordSubmit = async () => {
    if (validAndSamePassword && currentPassword) {
      await changePasswordAsync({ currentPassword, newPassword });
      disclosure.onClose();
    }
  };
  return (
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent maxW="480px" maxH="760px" px="40px" py="60px" backgroundColor="white">
        <IconButton
          position="absolute"
          w="32px"
          h="32px"
          top="24px"
          right="24px"
          aria-label="Close"
          onClick={disclosure.onClose}
          icon={<Exit />}
        />
        <ModalBody>
          <VStack w="full" gap="40px">
            <VStack gap="12px">
              <Text textStyle="h2" fontWeight="700">
                비밀번호 변경
              </Text>
            </VStack>
            <VStack w="full" gap="24px">
              <PasswordForm
                password={currentPassword}
                setPassword={setCurrentPassword}
                showPassword={showCurrentPassword}
                setShowPassword={setShowCurrentPassword}
                // 테스트 계정들이 있어서 true로 설정
                checkPassword={() => true}
                placeholder="기존 비밀번호를 입력해 주세요."
              />
              <PasswordForm
                password={newPassword}
                setPassword={setNewPassword}
                showPassword={showNewPassword}
                setShowPassword={setShowNewPassword}
                placeholder="새로운 비밀번호를 입력해 주세요."
              />
              <PasswordForm
                password={newPasswordCheck}
                setPassword={setNewPasswordCheck}
                showPassword={showNewPasswordCheck}
                setShowPassword={setShowNewPasswordCheck}
                placeholder="비밀번호를 다시 입력해 주세요."
              />
              <Button
                size="lg"
                variant="default"
                w="full"
                isDisabled={!currentPassword && validAndSamePassword !== true}
                onClick={handlePasswordSubmit}
              >
                <Text>확인</Text>
              </Button>
              <Button
                size="lg"
                variant="unstyled"
                w="full"
                border="1px solid"
                borderColor="gray200"
                onClick={disclosure.onClose}
              >
                <Text>취소</Text>
              </Button>
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
