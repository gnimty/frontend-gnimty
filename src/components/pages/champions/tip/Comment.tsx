import { Box, Button, Divider, HStack, Text, Textarea, VStack } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import { patchChampionComments, deleteChampionComments } from '@/apis/queries/championComment';
import type { ChampionCommentsEntry } from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';
import fullTierName from '@/apis/utils/fullTierName';
import profileIconUrl from '@/apis/utils/profileIconUrl';
import Up from '@/assets/icons/system/up.svg';
import PositionImage from '@/components/common/position-image/PositionImage';
import TierImage from '@/components/common/TierImage';

import Replies from './Replies';

dayjs.locale('ko');
dayjs.extend(duration);

interface CommentProps {
  comment: ChampionCommentsEntry;
  championId: number;
}

export default function Comment({ comment, championId }: CommentProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: updateCommentAsync, isSuccess: isUpdateSuccess } = useMutation({
    mutationFn: patchChampionComments,
  });
  const { mutateAsync: deleteCommentAsync, isSuccess: isDeleteSuccess } = useMutation({
    mutationFn: deleteChampionComments,
  });
  const [isEdit, setIsEdit] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // profileIconId 필요
  const {
    internalTagName,
    tier,
    division,
    lane,
    opponentChampionId,
    contents,
    commentsType,
    upCount,
    downCount,
    version,
    createdAt,
    childChampionComments,
  } = comment;
  const championName = championIdEnNameMap[opponentChampionId];
  const handleUpdate = async () => {
    if (textareaRef.current?.value === contents) {
      alert('변경 내용이 없습니다.');
      return;
    }
    if (textareaRef.current?.value !== undefined) {
      await updateCommentAsync({
        ...comment,
        championId: comment.opponentChampionId,
        contents: textareaRef.current.value,
      });
    }
  };
  const handleDelete = async () => {
    await deleteCommentAsync({ championId, commentsId: comment.id });
  };

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['championComments', championId],
    });
  }, [isDeleteSuccess, queryClient, championId]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['championComments', championId],
    });
  }, [isUpdateSuccess, queryClient, championId]);

  if (comment.deleted) {
    return (
      <Box h="60px" w="full" p="20px" textStyle="t2" fontWeight="400" color="gray500">
        삭제된 게시글입니다.
      </Box>
    );
  }

  return (
    <VStack bgColor="white" p="20px" gap="12px" align="flex-start">
      <HStack w="full" justify="space-between">
        <HStack h="24px" gap="12px" align="center">
          <Box w="24px" h="24px" overflow="hidden" borderRadius="12px">
            <Image src={profileIconUrl(1)} width="24" height="24" alt="profileIcon" />
          </Box>
          <Text textStyle="t2" fontWeight="700">
            {internalTagName}
          </Text>
          <HStack gap="4px" align="center">
            <TierImage tier={tier} width="24" />
            <Text textStyle="t2" fontWeight="400">
              {fullTierName(tier, division)}
            </Text>
          </HStack>
          <Divider orientation="vertical" h="full" colorScheme="gray500" />
          <Text textStyle="body" fontWeight="400" color="gray500">
            {/* TODO: createdAt 비교 */}
            {dayjs(createdAt).from(dayjs())}
          </Text>
        </HStack>
        {!isEdit && (
          <HStack h="24px" gap="8px">
            {/* TODO: 수정/삭제 권한 확인 필요 -  */}
            {/* TODO: 수정 방식 논의 */}
            <Text textStyle="body" fontWeight="400" color="gray500" onClick={() => setIsEdit(true)} cursor="pointer">
              수정
            </Text>
            <Divider orientation="vertical" h="full" colorScheme="gray500" />
            {/* TODO: 삭제 방식 논의 */}
            <Text textStyle="body" fontWeight="400" color="gray500" onClick={handleDelete}>
              삭제
            </Text>
          </HStack>
        )}
      </HStack>
      <HStack gap="4px">
        <Box p="4px 8px" borderRadius="999px" bgColor="main" color="white">
          <Text textStyle="body" fontWeight="400">
            {commentsType === 'TIP' ? '그님팁' : '알려주세요'}
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
          <PositionImage position={lane} width="16" />
        </Box>
        <Box w="24px" h="24px" borderRadius="999px" overflow="hidden">
          <Image src={championIconUrl(championName)} width="24" height="24" alt="Ezreal" />
        </Box>
        <Box borderRadius="999px" bgColor="gray200" color="gray600" p="4px 8px">
          <Text textStyle="body" fontWeight="400">
            v {version}
          </Text>
        </Box>
      </HStack>
      {isEdit ? (
        <HStack gap="12px">
          <Textarea
            h="140px"
            ref={textareaRef}
            rows={4}
            _placeholder={{
              color: 'gray500',
              textStyle: 't2',
              fontWeight: '400',
            }}
            borderColor="gray400"
            value={contents}
          />
          <VStack w="80px" gap="12px">
            <Button
              h="52px"
              borderRadius="4px"
              textStyle="t2"
              fontWeight="700"
              color="gray700"
              border="1px solid"
              borderColor="gray200"
              p="16px 12px"
              onClick={() => setIsEdit(false)}
            >
              취소
            </Button>
            <Button
              h="76px"
              borderRadius="4px"
              textStyle="t2"
              fontWeight="700"
              color="gray700"
              bgColor="main"
              p="14px 12px"
              onClick={handleUpdate}
            >
              저장
            </Button>
          </VStack>
        </HStack>
      ) : (
        <Box w="full" textStyle="t2" fontWeight="400">
          {contents}
        </Box>
      )}
      <HStack w="full" justify="space-between">
        <HStack gap="12px">
          {childChampionComments.length > 0 && (
            <Button display="flex" alignItems="center" justifyContent="space-between" gap="2px">
              <Text textStyle="t2" fontWeight="400" color="gray600">
                {childChampionComments.length}개의 답글
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
          >
            <Text fontWeight="400">비추천</Text>
            <Text fontWeight="700">{downCount}</Text>
          </HStack>
        </HStack>
      </HStack>
      {childChampionComments.length > 0 && <Replies />}
    </VStack>
  );
}
