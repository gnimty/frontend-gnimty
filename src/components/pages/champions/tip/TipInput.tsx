import { Box, Button, HStack, Textarea, VStack } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import dataDragonVersion from '@/apis/constants/dataDragonVersion';
import { addChampionComments, type PostOption as AddChampionOptions } from '@/apis/queries/championComment';
import type { CommentsType, Position, ProfileEntry } from '@/apis/types';
import SummonerIcon from '@/assets/icons/system/summoner.svg';
import PositionImage from '@/components/common/position-image/PositionImage';
import Select from '@/components/common/select/Select';

import ChampionSelect from './ChampionSelect';

interface TipInputProps {
  championId: number;
  currentUserInfo: ProfileEntry;
}

export default function TipInput({ championId, currentUserInfo }: TipInputProps) {
  const queryClient = useQueryClient();
  const { riotDependentInfo } = currentUserInfo;
  const mainAccount = riotDependentInfo.riotAccounts.find((account) => account.isMain);
  const { mutateAsync: addCommentAsync } = useMutation({
    mutationFn: addChampionComments,
    onSuccess: async () =>
      queryClient.invalidateQueries({
        queryKey: ['championComments', championId],
      }),
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [commentsType, setCommentsType] = useState<CommentsType>();
  const [lane, setLane] = useState<Position>();
  const [opponentChampionId, setOpponentChampionId] = useState<number>();
  const handleUpdateOpponentChampion = (championId: number) => {
    setOpponentChampionId(championId);
  };
  const handleSubmit = async () => {
    if (!textareaRef.current?.value) {
      alert('내용을 입력해주세요');
      return;
    }
    if (textareaRef.current?.value) {
      if (lane !== undefined && commentsType !== undefined && opponentChampionId !== undefined) {
        const options: AddChampionOptions = {
          internalTagName: mainAccount ? `${mainAccount.name}#${mainAccount.tagLine}` : currentUserInfo.nickname,
          championId,
          lane,
          commentsType,
          opponentChampionId,
          contents: textareaRef.current.value,
          depth: 0,
        };
        await addCommentAsync(options);
        textareaRef.current.value = '';
        setLane(undefined);
        setCommentsType(undefined);
        setOpponentChampionId(undefined);
      }
    }
  };

  return (
    <HStack w="full" minH="232px" p="20px" gap="20px" justify="space-between" align="flex-start">
      <Box
        w="80px"
        h="80px"
        borderRadius="40px"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <SummonerIcon width="80" height="80" />
      </Box>
      <VStack w="full" minH="192px" gap="12px" align="flex-start">
        <HStack w="full" justify="flex-start" gap="12px">
          <Select
            options={[
              { text: '카테고리 선택', value: '' },
              { text: '그님팁', value: 'TIP' },
              { text: '알려주세요', value: 'QUESTION' },
            ]}
            css={{ width: '136px' }}
            onChange={(v) => {
              if (v !== '') setCommentsType(v);
            }}
          />
          <Select
            options={[
              { text: '포지션 선택', value: '' },
              { text: '탑', value: 'TOP', leftAsset: <PositionImage position="TOP" /> },
              { text: '정글', value: 'JUNGLE', leftAsset: <PositionImage position="JUNGLE" /> },
              { text: '미드', value: 'MIDDLE', leftAsset: <PositionImage position="MIDDLE" /> },
              { text: '바텀', value: 'BOTTOM', leftAsset: <PositionImage position="BOTTOM" /> },
              { text: '서포터', value: 'UTILITY', leftAsset: <PositionImage position="UTILITY" /> },
            ]}
            css={{ width: '136px' }}
            onChange={(v) => {
              if (v !== '') setLane(v);
            }}
          />
          <ChampionSelect onSelect={handleUpdateOpponentChampion} opponentChampionId={opponentChampionId} />
        </HStack>
        <HStack w="full" gap="12px" justify="space-between">
          <Textarea
            h="140px"
            ref={textareaRef}
            rows={4}
            placeholder={`챔피언에 대한 정보나 나만의 팁을 남겨보세요! (현재 버전 v ${dataDragonVersion})`}
            _placeholder={{
              color: 'gray500',
              textStyle: 't2',
              fontWeight: '400',
            }}
            borderColor="gray400"
          />
          <Button
            type="submit"
            textStyle="t2"
            fontWeight="700"
            color="white"
            bgColor="main"
            w="80px"
            h="140px"
            borderRadius="4px"
            onClick={handleSubmit}
          >
            등록
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
}
