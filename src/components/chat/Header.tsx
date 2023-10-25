import { Box, HStack, useTheme } from '@chakra-ui/react';

import ExitIcon from '@/assets/icons/system/exit.svg';

interface HeaderProps {
  closeChat: () => void;
}

const Header = (props: HeaderProps) => {
  const theme = useTheme();
  return (
    <HStack w="100%" h="56px" p="16px 20px" justify="space-between">
      <Box textStyle="t1" color="gray800">
        채팅 목록
      </Box>
      <ExitIcon width="24px" height="24px" color={theme.colors.gray800} cursor="pointer" onClick={props.closeChat} />
    </HStack>
  );
};

export default Header;
