import { Box, HStack, Input, useTheme } from '@chakra-ui/react';

function ChatInput() {
  const theme = useTheme();
  return (
    <HStack w="400px" h="40px" p="16px">
      <Box
        w="332px"
        h="40px"
        p="10px 16px"
        bgColor="gray100"
        flex="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Input
          type="text"
          textStyle="t2"
          w="210px"
          h="20px"
          css={{
            placeholder: {
              color: theme.colors.gray500,
            },
          }}
        />
        <Box w="25px" h="20px" textStyle="t2" fontWeight="700" color="gray500" as="button" cursor="pointer">
          전송
        </Box>
      </Box>
    </HStack>
  );
}

export default ChatInput;
