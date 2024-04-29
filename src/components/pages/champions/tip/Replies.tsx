import { VStack, HStack, Box, Text, Divider, Button } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';

import { likeChampionComments } from '@/apis/queries/championComment';
import type { ChampionCommentsEntry } from '@/apis/types';
import fullTierName from '@/apis/utils/fullTierName';
import profileIconUrl from '@/apis/utils/profileIconUrl';
import TierImage from '@/components/common/TierImage';

dayjs.locale('ko');
dayjs.extend(duration);
dayjs.extend(relativeTime);

interface ReplyProps {
  reply: ChampionCommentsEntry;
  championId: number;
}

function Reply({ reply, championId }: ReplyProps) {
  const {
    internalTagName,
    tier,
    division,
    contents,
    mentionedInternalTagName,
    upCount,
    downCount,
    createdAt,
    likeOrNot,
  } = reply;
  const { mutateAsync: likeCommentAsync } = useMutation({
    mutationFn: likeChampionComments,
  });
  const handleLike = async (like: boolean) => {
    const request = {
      likeOrNot: like,
      cancel: likeOrNot === like,
    };
    await likeCommentAsync({ championId, commentsId: reply.id, ...request });
  };
  return (
    <VStack w="full" align="flex-start" gap="12px">
      <HStack w="full" justify="space-between">
        <HStack h="24px" gap="12px" align="center">
          <Box w="24px" h="24px" overflow="hidden" borderRadius="12px">
            <Image src={profileIconUrl(1)} width="24" height="24" alt="profileIcon" />
          </Box>
          <Text textStyle="t2" fontWeight="700">
            {internalTagName}
          </Text>
          {tier && (
            <HStack gap="4px" align="center">
              <TierImage tier={tier} width="24" />
              <Text textStyle="t2" fontWeight="400">
                {fullTierName(tier, division)}
              </Text>
            </HStack>
          )}
          <Divider orientation="vertical" h="full" colorScheme="gray500" />
          <Text textStyle="body" fontWeight="400" color="gray500">
            {dayjs(createdAt).from(dayjs())}
          </Text>
        </HStack>
        <HStack h="24px" gap="8px">
          <Text textStyle="body" fontWeight="400" color="gray500">
            신고
          </Text>
        </HStack>
      </HStack>
      <Box w="full" textStyle="t2" fontWeight="400">
        {mentionedInternalTagName && (
          <Text fontWeight="700" color="main">
            @{mentionedInternalTagName}
          </Text>
        )}
        {contents}
      </Box>
      <HStack w="full" justify="space-between">
        <HStack gap="12px">
          <Button borderBottom="1px solid" borderColor="gray600" borderRadius="0">
            <Text textStyle="t2" fontWeight="400" color="gray600">
              답글달기
            </Text>
          </Button>
        </HStack>
        <HStack gap="8px">
          <HStack
            borderRadius="999px"
            p="4px 8px"
            color="gray600"
            border="1px solid"
            borderColor="gray400"
            textStyle="body"
            gap="4px"
            onClick={async () => handleLike(true)}
            cursor="pointer"
          >
            <Text fontWeight="400">추천</Text>
            <Text fontWeight="700">{upCount}</Text>
          </HStack>
          <HStack
            borderRadius="999px"
            p="4px 8px"
            color="gray600"
            border="1px solid"
            borderColor="gray400"
            textStyle="body"
            gap="4px"
            onClick={async () => handleLike(false)}
            cursor="pointer"
          >
            <Text fontWeight="400">비추천</Text>
            <Text fontWeight="700">{downCount}</Text>
          </HStack>
        </HStack>
      </HStack>
    </VStack>
  );
}

interface RepliesProps {
  replies: ChampionCommentsEntry[];
  championId: number;
}

export default function Replies({ replies, championId }: RepliesProps) {
  return (
    <VStack w="full">
      <VStack w="full" p="20px" gap="24px" bgColor="gray100">
        {replies.map((reply) => (
          <Reply key={reply.id} reply={reply} championId={championId} />
        ))}
      </VStack>
    </VStack>
  );
}
