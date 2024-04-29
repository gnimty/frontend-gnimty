import { VStack, HStack, Box, Text, Divider, Button, useDisclosure, Textarea } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { deleteChampionComments, likeChampionComments, patchChampionComments } from '@/apis/queries/championComment';
import type { ChampionCommentsEntry, ProfileEntry } from '@/apis/types';
import fullTierName from '@/apis/utils/fullTierName';
import profileIconUrl from '@/apis/utils/profileIconUrl';
import TierImage from '@/components/common/TierImage';

import { DeleteModal } from './DeleteModal';

dayjs.locale('ko');
dayjs.extend(duration);
dayjs.extend(relativeTime);

interface ReplyProps {
  reply: ChampionCommentsEntry;
  championId: number;
  currentUserInfo?: ProfileEntry;
}

function Reply({ reply, championId, currentUserInfo }: ReplyProps) {
  const {
    memberId,
    internalTagName,
    tier,
    division,
    contents,
    mentionedInternalTagName,
    upCount,
    downCount,
    createdAt,
    likeOrNot,
    deleted,
  } = reply;
  const deleteDisclosure = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { mutateAsync: likeCommentAsync } = useMutation({
    mutationFn: likeChampionComments,
  });
  const { mutateAsync: editCommentAsync } = useMutation({
    mutationFn: patchChampionComments,
  });
  const { mutateAsync: deleteCommentAsync } = useMutation({
    mutationFn: deleteChampionComments,
  });
  const handleLike = async (like: boolean) => {
    const request = {
      likeOrNot: like,
      cancel: likeOrNot === like,
    };
    await likeCommentAsync({ championId, commentsId: reply.id, ...request });
  };
  const handleEdit = async () => {
    if (textareaRef.current?.value === contents) {
      alert('변경 내용이 없습니다.');
      setIsEdit(false);
      return;
    }
    if (textareaRef.current?.value !== undefined) {
      await editCommentAsync({
        championId,
        commentsId: reply.id,
        contents: textareaRef.current.value,
        mentionedInternalTagName,
      });
    }
  };
  const handleDelete = async () => {
    await deleteCommentAsync({ championId, commentsId: reply.id });
  };

  if (deleted) {
    return (
      <Box w="full" textStyle="t2" fontWeight="400" color="gray500" p="20px">
        삭제된 댓글입니다.
      </Box>
    );
  }

  return (
    <>
      <DeleteModal isOpen={deleteDisclosure.isOpen} onClose={deleteDisclosure.onClose} handleDelete={handleDelete} />
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
          {!isEdit && currentUserInfo?.id === memberId && (
            <HStack h="24px" gap="8px">
              <Text textStyle="body" fontWeight="400" color="gray500" onClick={() => setIsEdit(true)} cursor="pointer">
                수정
              </Text>
              <Divider orientation="vertical" h="full" colorScheme="gray500" />
              <Text textStyle="body" fontWeight="400" color="gray500" onClick={deleteDisclosure.onOpen}>
                삭제
              </Text>
            </HStack>
          )}
          {currentUserInfo?.id !== memberId && (
            <HStack h="24px" gap="8px">
              <Text textStyle="body" fontWeight="400" color="gray500">
                신고
              </Text>
            </HStack>
          )}
        </HStack>
        {isEdit ? (
          <HStack
            w="full"
            gap="20px"
            borderRadius="4px"
            border="1px solid"
            borderColor="gray400"
            p="12px"
            bgColor="white"
          >
            <Textarea
              ref={textareaRef}
              w="full"
              h="120px"
              textStyle="t2"
              fontWeight="400"
              color="gray800"
              rows={4}
              defaultValue={contents}
            />
            <VStack w="100px" h="full" gap="12px">
              <Button w="full" h="52px" borderRadius="4px" border="1px solid" borderColor="gray300" p="14px 12px">
                <Text textStyle="t2" fontWeight="700" color="gray700" onClick={() => setIsEdit(false)}>
                  취소
                </Text>
              </Button>
              <Button w="full" h="52px" borderRadius="4px" p="14px 12px" bgColor="main" onClick={handleEdit}>
                <Text textStyle="t2" fontWeight="700" color="white">
                  등록
                </Text>
              </Button>
            </VStack>
          </HStack>
        ) : (
          <Box w="full" textStyle="t2" fontWeight="400">
            {mentionedInternalTagName && (
              <Text fontWeight="700" color="main">
                @{mentionedInternalTagName}
              </Text>
            )}
            {contents}
          </Box>
        )}
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
    </>
  );
}

interface RepliesProps {
  replies: ChampionCommentsEntry[];
  championId: number;
  currentUserInfo?: ProfileEntry;
}

export default function Replies({ replies, championId, currentUserInfo }: RepliesProps) {
  return (
    <VStack w="full">
      <VStack w="full" p="20px" gap="24px" bgColor="gray100">
        {replies.map((reply) => (
          <Reply key={reply.id} reply={reply} championId={championId} currentUserInfo={currentUserInfo} />
        ))}
      </VStack>
    </VStack>
  );
}
