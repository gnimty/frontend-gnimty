import { Box, HStack, Image, StackDivider, VStack } from '@chakra-ui/react';

import StatusIndicator from '@/components/common/StatusIndicator';

const CHATS: {
  profileImg: string;
  username: string;
  status: 'ONLINE' | 'AWAY' | 'OFFLINE';
  topMsg: string;
  selected: boolean;
}[] = [
  {
    profileImg: 'https://ddragon.leagueoflegends.com/cdn/13.12.1/img/profileicon/0.png',
    username: 'hide on bush',
    status: 'ONLINE',
    topMsg: '자리있나요?',
    selected: true,
  },
  {
    profileImg: 'https://ddragon.leagueoflegends.com/cdn/13.12.1/img/profileicon/0.png',
    username: 'hide on bush',
    status: 'OFFLINE',
    topMsg: '자리있나요?',
    selected: false,
  },
];

interface ChatProps {
  profileImg: string;
  username: string;
  status: 'ONLINE' | 'AWAY' | 'OFFLINE';
  topMsg: string;
  selected: boolean;
}

function Chat({ profileImg, username, status, topMsg, selected }: ChatProps) {
  return (
    <HStack
      role="option"
      aria-selected={selected}
      w="260px"
      h="64px"
      bgColor="white"
      p="12px 20px"
      gap="12px"
      _hover={{
        bg: 'gray100',
      }}
      _selected={{
        bg: 'main',
      }}
    >
      <Image src={profileImg} alt={username} w="40px" h="40px" borderRadius="50%" />
      <VStack h="40px" gap="4px">
        <HStack h="20px" justify="space-between">
          <Box textStyle="t2">{username}</Box>
          <StatusIndicator status={status} />
        </HStack>
        <VStack h="20px" w="100%">
          <Box textStyle="body" textAlign="left" w="100%">
            {topMsg}
          </Box>
        </VStack>
      </VStack>
    </HStack>
  );
}

function ChatList() {
  return (
    <VStack role="listbox" w="260px" h="100%" divider={<StackDivider borderColor="gray100" />} spacing="1px">
      {CHATS.map((info) => (
        <Chat key={info.username} {...info} />
      ))}
    </VStack>
  );
}

export default ChatList;
