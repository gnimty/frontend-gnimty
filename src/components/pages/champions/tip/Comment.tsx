import { Box, Button, Divider, HStack, Text, Textarea, useDisclosure, VStack } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import { patchChampionComments, deleteChampionComments, reportChampionComments } from '@/apis/queries/championComment';
import type { ChampionCommentsEntry, ProfileEntry } from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';
import fullTierName from '@/apis/utils/fullTierName';
import Down from '@/assets/icons/system/down.svg';
import SummonerIcon from '@/assets/icons/system/summoner.svg';
import Up from '@/assets/icons/system/up.svg';
import PositionImage from '@/components/common/position-image/PositionImage';
import TierImage from '@/components/common/TierImage';

import { DeleteModal } from './DeleteModal';
import Replies from './Replies';
import { ReportModal } from './ReportModal';

dayjs.locale('ko');
dayjs.extend(relativeTime);
dayjs.extend(duration);

interface CommentProps {
  comment: ChampionCommentsEntry;
  championId: number;
  currentUserInfo?: ProfileEntry;
  refObject?: (node: HTMLDivElement | null) => void;
}

export default function Comment({ comment, championId, currentUserInfo }: CommentProps) {
  const queryClient = useQueryClient();
  const deleteDisclosure = useDisclosure();
  const reportDisclosure = useDisclosure();
  const { mutateAsync: updateCommentAsync, isSuccess: isUpdateSuccess } = useMutation({
    mutationFn: patchChampionComments,
  });
  const { mutateAsync: deleteCommentAsync, isSuccess: isDeleteSuccess } = useMutation({
    mutationFn: deleteChampionComments,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [repliesOpen, setRepliesOpen] = useState(false);
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
    memberId,
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
        championId,
        contents: textareaRef.current.value,
      });
    }
  };

  const handleDelete = async () => {
    await deleteCommentAsync({ championId, commentsId: comment.id });
  };

  const handleReport = async (reportType: 'ABUSE' | 'OTHER', reportComment?: string) => {
    const response = await reportChampionComments({ championId, commentsId: comment.id, reportType, reportComment });
    if (response.data.status.code === 200) {
      alert('신고가 완료되었습니다.');
      reportDisclosure.onClose();
    }
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
    <>
      <DeleteModal isOpen={deleteDisclosure.isOpen} onClose={deleteDisclosure.onClose} handleDelete={handleDelete} />
      <ReportModal isOpen={reportDisclosure.isOpen} onClose={reportDisclosure.onClose} handleReport={handleReport} />
      <VStack bgColor="white" p="20px" gap="12px" align="flex-start">
        <HStack w="full" justify="space-between">
          <HStack h="24px" gap="12px" align="center">
            <Box w="24px" h="24px" overflow="hidden" borderRadius="12px">
              <SummonerIcon width="24" height="24" />
            </Box>
            <Text textStyle="t2" fontWeight="700">
              {internalTagName}
            </Text>
            <HStack gap="4px" align="center">
              <TierImage tier={tier} width="24" />
              <Text textStyle="t2" fontWeight="400">
                {tier && fullTierName(tier, division)}
              </Text>
            </HStack>
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
              <Text
                textStyle="body"
                fontWeight="400"
                color="gray500"
                onClick={reportDisclosure.onOpen}
                cursor="pointer"
              >
                신고
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
              <Button
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap="2px"
                onClick={() => setRepliesOpen((prev) => !prev)}
                cursor="pointer"
              >
                <Text textStyle="t2" fontWeight="400" color="gray600">
                  {childChampionComments.length}개의 답글
                </Text>
                {repliesOpen ? <Down width="20" height="20" /> : <Up width="20" height="20" />}
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
        {childChampionComments.length > 0 && repliesOpen && <Replies replies={childChampionComments} />}
      </VStack>
    </>
  );
}
