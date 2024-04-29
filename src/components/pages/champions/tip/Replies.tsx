import { VStack, HStack, Box, Text, Divider, Button, useDisclosure, Textarea } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';

import {
  addChampionComments,
  deleteChampionComments,
  likeChampionComments,
  patchChampionComments,
  type PostOption,
} from '@/apis/queries/championComment';
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
  latestVersion: string;
  commentVersion: string;
  commentId: number;
}

function Reply({ reply, championId, currentUserInfo, commentId, commentVersion, latestVersion }: ReplyProps) {
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
  const queryClient = useQueryClient();
  const mainRiotAccount = currentUserInfo?.riotDependentInfo.riotAccounts.find((account) => account.isMain);
  const deleteDisclosure = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);
  const [newReplyOn, setNewReplyOn] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const newReplyTextareaRef = useRef<HTMLTextAreaElement>(null);
  const { mutateAsync: likeCommentAsync, isSuccess: isAddSuccess } = useMutation({
    mutationFn: likeChampionComments,
  });
  const { mutateAsync: editCommentAsync, isSuccess: isEditSuccess } = useMutation({
    mutationFn: patchChampionComments,
  });
  const { mutateAsync: deleteCommentAsync, isSuccess: isDeleteSuccess } = useMutation({
    mutationFn: deleteChampionComments,
  });
  const { mutateAsync: addReReplyAsync, isSuccess: isLikeSuccess } = useMutation({
    mutationFn: addChampionComments,
  });
  const handleReplySubmit = async () => {
    if (!mainRiotAccount) {
      alert('라이엇 계정 인증이 되지 않았습니다.');
      setNewReplyOn(false);
      return;
    }
    if (latestVersion !== commentVersion) {
      alert('부모 댓글과 버전이 다를 수 없습니다.');
      setNewReplyOn(false);
      return;
    }
    if (newReplyTextareaRef.current?.value !== '' && newReplyTextareaRef.current?.value !== undefined) {
      const request: PostOption = {
        internalTagName: `${mainRiotAccount.name}#${mainRiotAccount.tagLine}`,
        mentionedInternalTagName: internalTagName,
        tier: mainRiotAccount.queue,
        division: mainRiotAccount.division,
        championId,
        contents: newReplyTextareaRef.current.value,
        parentChampionCommentsId: commentId,
        depth: 1,
      };
      await addReReplyAsync(request);
      setNewReplyOn(false);
    }
  };
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
      setIsEdit(false);
    }
  };
  const handleDelete = async () => {
    await deleteCommentAsync({ championId, commentsId: reply.id });
  };

  useEffect(() => {
    if (isAddSuccess || isEditSuccess || isDeleteSuccess || isLikeSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['championComments', championId],
      });
    }
  }, [isAddSuccess, isEditSuccess, isDeleteSuccess, isLikeSuccess, queryClient, championId]);

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
            <Button
              borderBottom="1px solid"
              borderColor="gray600"
              borderRadius="0"
              onClick={() => setNewReplyOn((prev) => !prev)}
            >
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
      {/* 댓글의 댓글 */}
      {newReplyOn && (
        <HStack
          w="full"
          h="140px"
          bgColor="white"
          borderRadius="4px"
          border="1px solid"
          borderColor="gray400"
          p="12px"
          gap="20px"
        >
          <Textarea
            ref={newReplyTextareaRef}
            w="full"
            h="full"
            textStyle="t2"
            fontWeight="400"
            color="gray800"
            rows={4}
            p="0"
            border="none"
          />
          <VStack w="100px" h="full" justify="flex-end">
            <Button
              w="full"
              h="52px"
              borderRadius="4px"
              p="16px 12px"
              bgColor="main"
              color="white"
              onClick={handleReplySubmit}
            >
              <Text textStyle="t2" fontWeight="700">
                등록
              </Text>
            </Button>
          </VStack>
        </HStack>
      )}
    </>
  );
}

interface RepliesProps {
  replies: ChampionCommentsEntry[];
  championId: number;
  currentUserInfo?: ProfileEntry;
  latestVersion: string;
  commentId: number;
  commentInternalTagName: string;
  commentVersion: string;
  newReplyOn?: boolean;
  setNewReplyOn?: React.Dispatch<SetStateAction<boolean>>;
}

export default function Replies({
  replies,
  championId,
  currentUserInfo,
  commentId,
  latestVersion,
  commentInternalTagName,
  commentVersion,
  newReplyOn,
  setNewReplyOn,
}: RepliesProps) {
  const mainRiotAccount = currentUserInfo?.riotDependentInfo.riotAccounts.find((account) => account.isMain);
  const queryClient = useQueryClient();
  const { mutateAsync: addReplyAsync, isSuccess } = useMutation({
    mutationFn: addChampionComments,
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleReplySubmit = async () => {
    if (!setNewReplyOn || !commentId) {
      return;
    }
    if (!mainRiotAccount) {
      alert('라이엇 계정 인증이 되지 않았습니다.');
      setNewReplyOn(false);
      return;
    }
    if (latestVersion !== commentVersion) {
      alert('부모 댓글과 버전이 다를 수 없습니다.');
      setNewReplyOn(false);
      return;
    }
    if (textareaRef.current?.value !== '' && textareaRef.current?.value !== undefined) {
      const request: PostOption = {
        internalTagName: `${mainRiotAccount.name}#${mainRiotAccount.tagLine}`,
        mentionedInternalTagName: commentInternalTagName,
        tier: mainRiotAccount.queue,
        division: mainRiotAccount.division,
        championId,
        contents: textareaRef.current.value,
        parentChampionCommentsId: commentId,
        depth: 1,
      };
      await addReplyAsync(request);
      setNewReplyOn(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['championComments', championId],
      });
    }
  }, [isSuccess, queryClient, championId]);

  return (
    <VStack w="full">
      <VStack w="full" p="20px" gap="24px" bgColor="gray100">
        {/* 이미 존재하는 댓글이 있을 때 신규 댓글을 다는 경우 */}
        {newReplyOn && (
          <HStack
            w="full"
            h="140px"
            bgColor="white"
            borderRadius="4px"
            border="1px solid"
            borderColor="gray400"
            p="12px"
            gap="20px"
          >
            <Textarea
              ref={textareaRef}
              w="full"
              h="full"
              textStyle="t2"
              fontWeight="400"
              color="gray800"
              p="0"
              rows={4}
              border="none"
            />
            <VStack w="100px" h="full" justify="flex-end">
              <Button w="full" h="52px" borderRadius="4px" p="16px 12px" bgColor="gray200" onClick={handleReplySubmit}>
                <Text textStyle="t2" fontWeight="700" color="gray500">
                  등록
                </Text>
              </Button>
            </VStack>
          </HStack>
        )}
        {replies.map((reply) => (
          <Reply
            key={reply.id}
            reply={reply}
            championId={championId}
            currentUserInfo={currentUserInfo}
            commentId={commentId}
            commentVersion={commentVersion}
            latestVersion={latestVersion}
          />
        ))}
      </VStack>
    </VStack>
  );
}
