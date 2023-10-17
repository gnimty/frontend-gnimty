import { Flex, HStack, VStack, Link, Box } from '@chakra-ui/react';

import summoners from '@/api/mocks/summoners';
import Logo from '@/assets/images/logo.svg';
import Select from '@/components/common/select/Select';
import type { SelectOption } from '@/components/common/select/useSelect';

import ChampionsTable from './ChampionsTable';
import RecentMatches from './RecentMatches';
import Search from './Search';
import UserCardLandscape from './UserCardLandscape';

const queueSelectOptions: SelectOption[] = [
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
  return (
    <Flex m="102px auto 60px" w="1080px" flexDir="column">
      <VStack gap="40px" mb="60px">
        <Flex color="main">
          <Logo width={170} height={80} aria-label="그님티" />
        </Flex>
        <Search />
      </VStack>
      <HStack mb="16px" justifyContent="space-between" gap={0}>
        <Select options={queueSelectOptions} css={{ width: '124px' }} />
        {/* TODO: 링크 정해지면 추가하기 */}
        <Link href="" textStyle="t2" fontWeight={400} textDecor="none" textAlign="center" w="68px" color="gray500">
          전체 보기
        </Link>
      </HStack>
      <VStack gap="12px" mb="24px">
        {summoners.map((summoner) => (
          <UserCardLandscape key={summoner.id} summoner={summoner} />
        ))}
      </VStack>
      <Flex gap="24px">
        <RecentMatches />
        <ChampionsTable />
      </Flex>
    </Flex>
  );
}
