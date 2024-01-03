import { Box, HStack, Image, Stack, StackDivider, VStack, useTheme } from '@chakra-ui/react';

import ExitIcon from '@/assets/icons/system/exit.svg';
import StatusIndicator from '@/components/common/StatusIndicator';
import { useState } from 'react';

const CHATS: {
  profileImg: string;
  username: string;
  hashtag: string;
  status: 'ONLINE' | 'AWAY' | 'OFFLINE';
  topMsg: string;
  selected: boolean;
}[] = [
  {
    profileImg: 'https://ddragon.leagueoflegends.com/cdn/13.12.1/img/profileicon/0.png',
    username: 'hide on bush',
    hashtag: '#KR1',
    status: 'ONLINE',
    topMsg: '자리있나요?',
    selected: true,
  },
  {
    profileImg: 'https://ddragon.leagueoflegends.com/cdn/13.12.1/img/profileicon/0.png',
    username: 'hide on bush',
    hashtag: '#KR1',
    status: 'OFFLINE',
    topMsg: '자리있나요?',
    selected: false,
  },
];

interface ChatProps {
  profileImg: string;
  username: string;
  hashtag: string;
  status: 'ONLINE' | 'AWAY' | 'OFFLINE';
  topMsg: string;
  selected: boolean;
}

function Chat({ profileImg, username, hashtag, status, topMsg, selected }: ChatProps) {
  const [isOnHover, setIsOnHover] = useState(false);
  const theme = useTheme();
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
      onMouseEnter={() => setIsOnHover(true)}
      onMouseLeave={() => setIsOnHover(false)}
      borderBottom={`1px solid ${theme.colors.gray100}`}
    >
      <Image src={profileImg} alt={username} w="40px" h="40px" borderRadius="50%" />
      <VStack h="40px" gap="4px">
        <HStack h="20px" justify="space-between">
          <Box textStyle="t2" color={selected ? 'white' : 'gray800'}>
            {username}
          </Box>
          <Box textStyle="t2" fontWeight="400" color={selected ? 'gray400' : 'gray600'}>
            {hashtag}
          </Box>
          <StatusIndicator status={status} />
        </HStack>
        <VStack h="20px" w="100%">
          <Box textStyle="body" textAlign="left" w="100%" color={selected ? 'white' : 'gray800'}>
            {topMsg}
          </Box>
        </VStack>
      </VStack>
      {isOnHover && <ExitIcon width="16px" height="16px" color={theme.colors.gray500} />}
    </HStack>
  );
}

function ChatList() {
  const theme = useTheme();
  return (
    <Box w="261px" h="100%" borderRight={`1px solid ${theme.colors.gray100}`}>
      <VStack role="listbox" w="full" h="max-content" overflowY="auto" spacing="1px">
        {CHATS.map((info) => (
          <Chat key={info.username} {...info} />
        ))}
      </VStack>
    </Box>
  );
}

export default ChatList;
