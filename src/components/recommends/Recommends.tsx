import {
  HStack,
  Box,
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import mainRecentlyQuery from '@/apis/queries/mainRecentlyQuery';
import type { GameMode } from '@/apis/types';
import Exit from '@/assets/icons/system/exit.svg';

import SummonerCard from './SummonerCard';

interface RecommendsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecommendsModal = ({ isOpen, onClose }: RecommendsModalProps) => {
  const theme = useTheme();
  const [queueType, setQueueType] = useState<Omit<GameMode, 'BLIND'>>('RANK_SOLO');
  const { data } = useQuery(mainRecentlyQuery());
  const [page, setPage] = useState(0);
  const summoners = queueType === 'RANK_SOLO' ? data?.data.recentlySummoners : data?.data.recentlySummonersFlex;

  const handleQueueTypeChange = (value: Omit<GameMode, 'BLIND'>) => {
    setQueueType(value);
  };

  useEffect(() => {
    if (isOpen) {
      setPage(0);
    }
  }, [queueType, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        w="1040px"
        borderRadius="8px"
        bgColor="white"
        display="flex"
        flexDir="column"
        justifyContent="space-between"
      >
        <HStack
          w="100%"
          h="56px"
          justify="space-between"
          align="center"
          p="16px 20px"
          borderBottom="1px solid"
          borderColor="gray200"
        >
          <HStack gap="8px">
            <Text textStyle="t1" fontWeight="700">
              소환사 추천
            </Text>
            <Text textStyle="t2" fontWeight="400" color="gray500">
              최근 20게임 기준
            </Text>
          </HStack>
          <IconButton w="24px" h="24px" aria-label="close" onClick={onClose} icon={<Exit />} />
        </HStack>
        <VStack w="100%" h="540px" p="20px" gap="10px" overflow="hidden" bgColor="gray100" alignItems="flex-start">
          <RadioGroup
            onChange={handleQueueTypeChange}
            value={queueType as string}
            display="flex"
            gap="20px"
            alignItems="center"
          >
            <Radio value="RANK_SOLO">
              <Text textStyle="t2" fontWeight="400">
                솔로 랭크
              </Text>
            </Radio>
            <Radio value="RANK_FLEX">
              <Text textStyle="t2" fontWeight="400">
                자유 랭크
              </Text>
            </Radio>
          </RadioGroup>
          <HStack w="1000px" h="full" gap="20px">
            {summoners?.slice(page * 3, page * 3 + 3).map((summoner) => <SummonerCard key={summoner.name} summoner={summoner} />)}
          </HStack>
        </VStack>
        <HStack w="full" h="40px" p="16px 0" gap="10px" justify="center" align="center">
          {summoners &&
            Array.from({ length: Math.ceil(summoners.length / 3) }).map((_, index) => (
              <Box
                key={index}
                w="8px"
                h="8px"
                bgColor="gray300"
                borderRadius="99px"
                aria-selected={index === page ? 'true' : 'false'}
                _selected={{ bgColor: theme.colors.main }}
                onClick={() => setPage(index)}
                cursor="pointer"
              />
            ))}
        </HStack>
      </ModalContent>
    </Modal>
  );
};

export default RecommendsModal;
