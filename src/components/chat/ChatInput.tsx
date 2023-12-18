import { Box, HStack, Input, VStack, useDisclosure } from '@chakra-ui/react';

import EditVerticalIcon from '@/assets/icons/system/edit-vertical.svg';

function ChatInput() {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <HStack w="400px" h="40px" p="16px" position="absolute" bottom="5%">
      <HStack
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
          _placeholder={{
            color: 'gray500',
            fontWeight: '400',
          }}
          placeholder="텍스트를 입력하세요."
        />
        <Box w="25px" h="20px" textStyle="t2" fontWeight="700" color="gray500" as="button" cursor="pointer">
          전송
        </Box>
      </HStack>
      <Box position="relative">
        {isOpen && <ToggleMenu />}
        <EditVerticalIcon width="100%" onClick={onToggle} />
      </Box>
    </HStack>
  );
}

function ToggleMenu() {
  return (
    <VStack
      w="124px"
      align="center"
      justify="space-between"
      position="absolute"
      top="-90px"
      left="-105px"
      bgColor="white"
      boxShadow="0px 2px 6px 0px rgba(17, 17, 17, 0.10)"
    >
      <Box
        w="full"
        textStyle="t2"
        color="gray600"
        fontWeight="400"
        textAlign="left"
        _hover={{
          color: 'gray800',
        }}
        p="10px 12px"
        borderBottom="1px solid gray100"
      >
        차단하기
      </Box>
      <Box
        w="full"
        textStyle="t2"
        color="gray600"
        fontWeight="400"
        textAlign="left"
        _hover={{
          color: 'gray800',
        }}
        p="10px 12px"
      >
        채팅방 나가기
      </Box>
    </VStack>
  );
}

export default ChatInput;
