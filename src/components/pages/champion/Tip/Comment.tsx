import { Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

import championIconUrl from '@/apis/utils/championIconUrl';
import profileIconUrl from '@/apis/utils/profileIconUrl';
import Up from '@/assets/icons/system/up.svg';
import PositionImage from '@/components/common/position-image/PositionImage';
import TierImage from '@/components/common/TierImage';


import Replies from './Replies';
// import Down from '@/assets/icons/system/down.svg';

interface CommentProps {
  replies: string[];
}

export default function Comment({ replies }: CommentProps) {
  return (
    <VStack bgColor="white" p="20px" gap="12px" align="flex-start">
      <HStack w="full" justify="space-between">
        <HStack h="24px" gap="12px" align="center">
          <Box w="24px" h="24px" overflow="hidden" borderRadius="12px">
            <Image src={profileIconUrl(1)} width="24" height="24" alt="profileIcon" />
          </Box>
          <Text textStyle="t2" fontWeight="700">
            KT DEFT
          </Text>
          <HStack gap="4px" align="center">
            <TierImage tier="challenger" width="24" />
            <Text textStyle="t2" fontWeight="400">
              Challenger
            </Text>
          </HStack>
          <Divider orientation="vertical" h="full" colorScheme="gray500" />
          <Text textStyle="body" fontWeight="400" color="gray500">
            2일전
          </Text>
        </HStack>
        <HStack h="24px" gap="8px">
          <Text textStyle="body" fontWeight="400" color="gray500">
            수정
          </Text>
          <Divider orientation="vertical" h="full" colorScheme="gray500" />
          <Text textStyle="body" fontWeight="400" color="gray500">
            삭제
          </Text>
        </HStack>
      </HStack>
      <HStack gap="4px">
        <Box p="4px 8px" borderRadius="999px" bgColor="main" color="white">
          <Text textStyle="body" fontWeight="400">
            그님팁
            {/* 알려주세요! */}
          </Text>
        </Box>
        <Box
          w="24px"
          h="24px"
          borderRadius="999px"
          bgColor="gray200"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <PositionImage position="BOTTOM" width="16" />
        </Box>
        <Box w="24px" h="24px" borderRadius="999px" overflow="hidden">
          <Image src={championIconUrl('Ezreal')} width="24" height="24" alt="Ezreal" />
        </Box>
        <Box borderRadius="999px" bgColor="gray200" color="gray600" p="4px 8px">
          <Text textStyle="body" fontWeight="400">
            v 1.0.3
          </Text>
        </Box>
      </HStack>
      <Box w="full" textStyle="t2" fontWeight="400">
        진도이제 1티어 올라올때 됨;; 데프트가 한번 써줬으면 좋겠다 제발;;진도이제 1티어 올라올때 됨;; 데프트가 한번
        써줬으면 좋겠다 제발;;진도이제 1티어 올라올때 됨;; 데프트가 한번 써줬으면 좋겠다 제발;;진도이제 1티어 올라올때
        됨;; 데프트가 한번 써줬으면 좋겠다 제발;;진도이제 1티어 올라올때 됨;; 데프트가 한번 써줬으면 좋겠다
        제발;;진도이제 1티어 올라올때 됨;; 데프트가 한번 써줬으면 좋겠다 제발;;진도이제 1티어 올라올때 됨;; 데프트가
        한번 써줬으면 좋겠다 제발;;진도이제 1티어 올라올때 됨;; 데프트가 한번 써줬으면 좋겠다 제발;;진도이제 1티어
        올라올때 됨;; 데프트가 한번 써줬으면 좋겠다 제발;;진도이제 1티어 올라올때 됨;; 데프트가 한번 써줬으면 좋겠다
        제발;;진도이제 1티어 올라올때 됨;; 데프트가 한번 써줬으면 좋겠다 제발;;진도이제 1티어 올라올때 됨;; 데프트가
        한번 써줬으면 좋겠다 제발;;진도이제 1티어 올라올때 됨;; 데프트가 한번 써줬으면 좋겠다 제발;;진도이제 1티어
        올라올때 됨;; 데프트가 한번 써줬으면 좋겠다 제발;;진도이제 1티어 올라올때 됨;; 데프트가 한번 써줬으면 좋겠다
        제발;;진도이제 1티어 올라올때 됨;; 데프트가 한번 써줬으면 좋겠다 제발;;
      </Box>
      <HStack w="full" justify="space-between">
        <HStack gap="12px">
          {replies.length > 0 && (
            <Button display="flex" alignItems="center" justifyContent="space-between" gap="2px">
              <Text textStyle="t2" fontWeight="400" color="gray600">
                {replies.length}개의 답글
              </Text>
              {/* TODO: replies open/close */}
              <Up width="20" height="20" />
            </Button>
          )}
          <Button borderBottom="1px solid" borderColor="gray600">
            <Text textStyle="t2" fontWeight="400" color="gray600">
              답글달기
            </Text>
          </Button>
        </HStack>
        <HStack gap="8px">
          <HStack borderRadius="999px" p="4px 8px" bgColor="main" color="white" textStyle="body" gap="4px">
            <Text fontWeight="400">추천</Text>
            <Text fontWeight="700">1</Text>
          </HStack>
          <HStack
            borderRadius="999px"
            p="4px 8px"
            color="gray600"
            border="1px solid"
            borderColor="gray400"
            textStyle="body"
            gap="4px"
          >
            <Text fontWeight="400">비추천</Text>
            <Text fontWeight="700">1</Text>
          </HStack>
        </HStack>
      </HStack>
      {replies.length > 0 && <Replies />}
    </VStack>
  );
}
