import { Flex, HStack, Link, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import type { GameMode } from '@/apis/types';
import Logo from '@/assets/images/logo.svg';
import Select from '@/components/common/select/Select';
import type { SelectOption } from '@/components/common/select/useSelect';

import ChampionsTable from './ChampionsTable';
import RecentMatches from './RecentMatches';
import RecommendedSummonersSection from './RecommendedSummonersSection';
import Search from './search/Search';

const queueSelectOptions: SelectOption<GameMode>[] = [
  {
    text: '솔로 랭크',
    value: 'RANK_SOLO',
  },
  {
    text: '자유 랭크',
    value: 'RANK_FLEX',
  },
  {
    text: '칼바람 나락',
    value: 'BLIND',
  },
];

export default function Main() {
  const [gameMode, setGameMode] = useState<GameMode>('RANK_SOLO');

  const handleGameModeChanged = (value: GameMode) => {
    setGameMode(value);
  };

  return (
    <Flex m="102px auto 60px" w="1080px" flexDir="column">
      <VStack gap="40px" mb="60px">
        <Flex color="main">
          <Logo width={170} height={80} aria-label="그님티" />
        </Flex>
        <Search />
      </VStack>
      <HStack mb="16px" justifyContent="space-between" gap={0}>
        <Select options={queueSelectOptions} onChange={handleGameModeChanged} css={{ width: '124px' }} />
        {/* TODO: 링크 정해지면 추가하기 */}
        <Link href="" textStyle="t2" fontWeight={400} textDecor="none" textAlign="center" w="68px" color="gray500">
          전체 보기
        </Link>
      </HStack>
      <RecommendedSummonersSection gameMode={gameMode} mb="24px" />
      <Flex gap="24px">
        <RecentMatches />
        <ChampionsTable />
      </Flex>
    </Flex>
  );
}
