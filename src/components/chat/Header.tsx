import { Box, HStack } from '@chakra-ui/react';
import styled from '@emotion/styled';

import ExitIcon from '@/assets/icons/system/exit.svg';

const ExitButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

interface HeaderProps {
  closeChat: () => void;
}

const Header = ({ closeChat }: HeaderProps) => {
  return (
    <HStack w="100%" h="56px" p="16px 20px" justify="space-between">
      <Box textStyle="t1" color="gray800">
        채팅 목록
      </Box>
      <ExitButton onClick={closeChat}>
        <ExitIcon width="24px" height="24px" color="gray800" />
      </ExitButton>
    </HStack>
  );
};

export default Header;
