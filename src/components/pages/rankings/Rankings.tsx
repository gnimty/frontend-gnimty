import { Flex, Heading } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import rankTiersQuery from '@/apis/queries/rankTiersQuery';
import type { GameMode } from '@/apis/types';
import Select from '@/components/common/select/Select';
import type { SelectOption } from '@/components/common/select/useSelect';
import usePagination from '@/hooks/usePagination';

import Pagination from './Pagination';
import RankingsTable from './RankingsTable';
import TopThreeSection from './TopThreeSection';

const queueSelectOptions: SelectOption<GameMode>[] = [
  {
    text: '솔로 랭크',
    value: 'RANK_SOLO',
  },
  {
    text: '자유 랭크',
    value: 'RANK_FLEX',
  },
];

interface RankingsInnerProps {
  page: number;
}

/**
 * `useSuspenseQuery()`는 `enabled` 옵션이 지원되지 않는 문제 때문에
 * 컴포넌트를 나눴습니다.
 * 참고: {@link https://github.com/TanStack/query/discussions/6206}
 */
function RankingsInner(props: RankingsInnerProps) {
  const { page } = props;
  const { data } = useSuspenseQuery(rankTiersQuery({ page }));

  return (
    <Flex flexDir="column" w="1080px" m="40px auto 60px">
      <Heading as="h1" textStyle="h2" fontWeight="bold" color="gray800">
        소환사 랭킹
      </Heading>
      <Flex mt="24px" justifyContent="space-between">
        <Flex>
          <Select options={queueSelectOptions} css={{ width: '140px' }} />
        </Flex>
      </Flex>
      <TopThreeSection mt="24px" />
      <RankingsTable ranks={data.data.ranks} mt="24px" />
      <Pagination currentPage={page} totalItems={data.data.totalSummoners} maxItemsInPage={100} mt="40px" />
    </Flex>
  );
}

export default function Rankings() {
  const page = usePagination();

  if (page === undefined) {
    return;
  }

  return <RankingsInner page={page} />;
}
