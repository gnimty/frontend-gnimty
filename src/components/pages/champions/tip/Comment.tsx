import 'dayjs/locale/ko';

import { Box, Button, Divider, HStack, Text, Textarea, useDisclosure, VStack } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import { type SetStateAction, useRef, useState } from 'react';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import {
  patchChampionComments,
  deleteChampionComments,
  reportChampionComments,
  likeChampionComments,
  addChampionComments,
  type PostOption as NewReplyOption,
} from '@/apis/queries/championComment';
import type { ChampionCommentsEntry, ProfileEntry, ReportType } from '@/apis/types';
import useAuth from '@/apis/useAuth';
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
  latestVersion: string;
  currentUserInfo?: ProfileEntry;
  refObject?: (node: HTMLDivElement | null) => void;
}

export default function Comment({ comment, championId, latestVersion, currentUserInfo, refObject }: CommentProps) {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const deleteDisclosure = useDisclosure();
  const reportDisclosure = useDisclosure();
  const { mutateAsync: addReplyAsync } = useMutation({
    mutationFn: addChampionComments,
    onSuccess: async () =>
      queryClient.invalidateQueries({
        queryKey: ['championComments', championId],
      }),
  });
  const { mutateAsync: updateCommentAsync } = useMutation({
    mutationFn: patchChampionComments,
    onSuccess: async () =>
      queryClient.invalidateQueries({
        queryKey: ['championComments', championId],
      }),
  });
  const { mutateAsync: deleteCommentAsync } = useMutation({
    mutationFn: deleteChampionComments,
    onSuccess: async () =>
      queryClient.invalidateQueries({
        queryKey: ['championComments', championId],
      }),
  });
  const { mutateAsync: likeCommentAsync } = useMutation({
    mutationFn: likeChampionComments,
    onSuccess: async () =>
      queryClient.invalidateQueries({
        queryKey: ['championComments', championId],
      }),
    onError(error) {
      if (error.response?.data.status.code === 409) {
        alert('이미 좋아요 또는 싫어요를 한 댓글입니다.');
      }
    },
  });
  const { mutate: reportChampionComment } = useMutation({
    mutationFn: reportChampionComments,
    onError: (error) => {
      if (error.response?.data.status.code === 409) {
        alert('이미 신고한 댓글입니다.');
        reportDisclosure.onClose();
      }
    },
  });
  const [newReplyOn, setNewReplyOn] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [repliesOpen, setRepliesOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const newReplyTextareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    id,
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
    blocked,
    deleted,
    likeOrNot,
  } = comment;
  const [showBlocked, setShowBlocked] = useState(false);
  const championName = championIdEnNameMap[opponentChampionId];
  const mainRiotAccount = currentUserInfo?.riotDependentInfo.riotAccounts.find((account) => account.isMain);

  const handleReplySubmit = async () => {
    if (!mainRiotAccount) {
      alert('라이엇 계정 인증이 되지 않았습니다.');
      setNewReplyOn(false);
      return;
    }
    if (latestVersion !== version) {
      alert('부모 댓글과 버전이 다를 수 없습니다.');
      setNewReplyOn(false);
      return;
    }
    if (newReplyTextareaRef.current?.value !== undefined) {
      const options: NewReplyOption = {
        internalTagName: `${mainRiotAccount.name}#${mainRiotAccount.tagLine}`,
        mentionedInternalTagName: internalTagName,
        tier: mainRiotAccount.queue,
        division: mainRiotAccount.division,
        championId,
        contents: newReplyTextareaRef.current.value,
        parentChampionCommentsId: id,
        depth: 1,
      };
      await addReplyAsync(options);
      setNewReplyOn(false);
    }
  };

  const handleUpdate = async () => {
    if (textareaRef.current?.value === contents) {
      alert('변경 내용이 없습니다.');
      setIsEdit(false);
      return;
    }
    if (textareaRef.current?.value !== undefined) {
      await updateCommentAsync({
        commentsId: comment.id,
        championId,
        contents: textareaRef.current.value,
      });
      setIsEdit(false);
    }
  };

  const handleDelete = async () => {
    await deleteCommentAsync({ championId, commentsId: comment.id });
  };

  const handleReport = (reportType: ReportType[], reportComment?: string) => {
    reportChampionComment({ championId, commentsId: comment.id, reportType, reportComment });
  };

  const handleLike = async (like: boolean) => {
    if (!isAuthenticated) {
      alert('로그인 후 이용해주세요.');
      return;
    }
    const request = {
      likeOrNot: like,
      cancel: likeOrNot === like,
    };
    await likeCommentAsync({ championId, commentsId: comment.id, ...request });
  };

  if (deleted) {
    return (
      <Box w="full" p="20px" ref={refObject}>
        <Text textStyle="t2" fontWeight="400" color="gray500">
          삭제된 게시글입니다.
        </Text>
      </Box>
    );
  }

  return (
    <>
      {isAuthenticated && (
        <DeleteModal isOpen={deleteDisclosure.isOpen} onClose={deleteDisclosure.onClose} handleDelete={handleDelete} />
      )}
      {isAuthenticated && (
        <ReportModal isOpen={reportDisclosure.isOpen} onClose={reportDisclosure.onClose} handleReport={handleReport} />
      )}
      <VStack bgColor="white" w="full" p="20px" gap="12px" align="flex-start" ref={refObject}>
        <HStack w="full" justify="space-between">
          <HStack h="24px" gap="12px" align="center">
            <Box w="24px" h="24px" overflow="hidden" borderRadius="12px">
              <SummonerIcon width="24" height="24" />
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
            <Text textStyle="body" fontWeight="400" color="gray500">
              |
            </Text>
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
              <Text
                textStyle="body"
                fontWeight="400"
                color="gray500"
                onClick={deleteDisclosure.onOpen}
                cursor="pointer"
              >
                삭제
              </Text>
            </HStack>
          )}
          {currentUserInfo?.id !== memberId && isAuthenticated && (
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
        <VStack w="full" gap="12px" position="relative" align="flex-start">
          {blocked && !showBlocked && <BlockedComment setShowBlocked={setShowBlocked} />}
          <HStack gap="4px" filter="auto" blur={blocked && !showBlocked ? 'md' : 'none'}>
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
            <Box
              w="24px"
              h="24px"
              borderRadius="999px"
              overflow="hidden"
              position="relative"
              _after={{
                content: '"VS"',
                position: 'absolute',
                textStyle: 't2',
                fontWeight: '400',
                color: 'white',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Image src={championIconUrl(championName)} width="24" height="24" alt="Ezreal" />
            </Box>
            <Box borderRadius="999px" bgColor="gray200" color="gray600" p="4px 8px">
              <Text textStyle="body" fontWeight="400">
                v {version}
              </Text>
            </Box>
          </HStack>
          {isEdit ? (
            <HStack w="full" gap="12px">
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
                defaultValue={contents}
              />
              <VStack w="80px" gap="12px">
                <Button
                  w="full"
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
                  w="full"
                  h="76px"
                  borderRadius="4px"
                  textStyle="t2"
                  fontWeight="700"
                  color="white"
                  bgColor="main"
                  p="14px 12px"
                  onClick={handleUpdate}
                >
                  저장
                </Button>
              </VStack>
            </HStack>
          ) : (
            <Box w="full" textStyle="t2" fontWeight="400" filter="auto" blur={blocked && !showBlocked ? 'md' : 'none'}>
              {contents}
            </Box>
          )}
        </VStack>

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
            {isAuthenticated && (
              <Button
                borderBottom="1px solid"
                borderColor="gray600"
                borderRadius="0"
                onClick={() => {
                  setNewReplyOn((prev) => !prev);
                  setRepliesOpen(true);
                }}
                cursor="pointer"
              >
                <Text textStyle="t2" fontWeight="400" color="gray600">
                  답글달기
                </Text>
              </Button>
            )}
          </HStack>
          <HStack gap="8px">
            <HStack
              aria-selected={likeOrNot === true}
              borderRadius="999px"
              p="4px 8px"
              color="gray600"
              border="1px solid"
              borderColor="gray400"
              textStyle="body"
              gap="4px"
              _selected={{
                bgColor: 'main',
                color: 'white',
              }}
              onClick={async () => handleLike(true)}
              cursor="pointer"
            >
              <Text fontWeight="400">추천</Text>
              <Text fontWeight="700">{upCount}</Text>
            </HStack>
            <HStack
              aria-selected={likeOrNot === false}
              borderRadius="999px"
              p="4px 8px"
              color="gray600"
              border="1px solid"
              borderColor="gray400"
              textStyle="body"
              gap="4px"
              _selected={{
                bgColor: 'main',
                color: 'white',
              }}
              onClick={async () => handleLike(false)}
              cursor="pointer"
            >
              <Text fontWeight="400">비추천</Text>
              <Text fontWeight="700">{downCount}</Text>
            </HStack>
          </HStack>
        </HStack>
        {childChampionComments.length > 0 && repliesOpen && (
          <Replies
            replies={childChampionComments}
            championId={championId}
            currentUserInfo={currentUserInfo}
            latestVersion={latestVersion}
            commentId={comment.id}
            commentInternalTagName={internalTagName}
            commentVersion={version}
            newReplyOn={newReplyOn}
            setNewReplyOn={setNewReplyOn}
          />
        )}
      </VStack>
      {childChampionComments.length === 0 && newReplyOn && (
        <Box w="full" h="full" bgColor="white" p="0 20px 20px 20px">
          <HStack w="full" h="140px" borderRadius="4px" border="1px solid" borderColor="gray400" p="12px" gap="20px">
            <Textarea
              ref={newReplyTextareaRef}
              border="none"
              w="full"
              h="full"
              textStyle="t2"
              fontWeight="400"
              color="gray800"
              p="0"
              rows={4}
              placeholder="답글 내용을 입력해주세요."
              _placeholder={{
                textStyle: 't2',
                color: 'gray500',
                fontWeight: '400',
              }}
            />
            <VStack w="100px" h="full" justify="flex-end">
              <Button
                w="full"
                h="52px"
                borderRadius="4px"
                bgColor="main"
                color="white"
                p="16px 12px"
                textStyle="t2"
                fontWeight="700"
                onClick={handleReplySubmit}
              >
                등록
              </Button>
            </VStack>
          </HStack>
        </Box>
      )}
    </>
  );
}

interface BlockedCommentProps {
  setShowBlocked: React.Dispatch<SetStateAction<boolean>>;
}

function BlockedComment({ setShowBlocked }: BlockedCommentProps) {
  return (
    <VStack w="full" h="full" gap="8px" align="center" position="absolute" top="0" left="0" zIndex="10">
      <Text textStyle="t2" fontWeight="400" color="gray800">
        차단한 소환사의 댓글입니다.
      </Text>
      <Button
        type="button"
        borderRadius="4px"
        w="80px"
        h="32px"
        border="1px solid"
        borderColor="gray200"
        p="6px 12px"
        onClick={() => setShowBlocked(true)}
      >
        <Text textStyle="t2" fontWeight="400" color="gray700">
          확인하기
        </Text>
      </Button>
    </VStack>
  );
}
