import { Box, IconButton, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react';

import Hide from '@/assets/icons/system/hide.svg';
import View from '@/assets/icons/system/view.svg';
import AccountInput from '@/components/pages/account/AccountInput';
import { passwordRegex } from '@/utils/regex';

import type { StackProps } from '@chakra-ui/react';

interface PasswordFormProps {
  width?: StackProps['width'];
  password: string;
  setPassword: (password: string) => void;
  placeholder?: string;
  showPassword?: boolean;
  setShowPassword: { on: () => void; off: () => void; toggle: () => void };
  checkPassword?: (password: string) => boolean;
  notificationText?: {
    default: string;
    warning: string;
    success: string;
  };
}
export default function PasswordForm({
  width,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  placeholder = '비밀번호를 입력해 주세요.',
  checkPassword = (password) => {
    return !!passwordRegex.exec(password);
  },
  notificationText = {
    default: '8자 이상의 영문, 숫자, 특수문자',
    warning: '8자 이상의 영문, 숫자, 특수문자',
    success: '8자 이상의 영문, 숫자, 특수문자',
  },
}: PasswordFormProps) {
  return (
    <VStack w={width ?? 'full'} gap="8px">
      <InputGroup variant="outline">
        <AccountInput
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement>
          <IconButton
            w="20px"
            h="20px"
            onClick={setShowPassword.toggle}
            aria-label="hide"
            color="gray600"
            icon={showPassword ? <Hide /> : <View />}
          />
        </InputRightElement>
      </InputGroup>
      <Box alignSelf="flex-start" textStyle="body">
        {!password ? (
          <Text color="gray500" fontWeight={400}>
            {notificationText.default}
          </Text>
        ) : !checkPassword(password) ? (
          <Text color="main" fontWeight={700}>
            {notificationText.warning}
          </Text>
        ) : (
          <Text color="blue800" fontWeight={400}>
            {notificationText.success}
          </Text>
        )}
      </Box>
    </VStack>
  );
}
