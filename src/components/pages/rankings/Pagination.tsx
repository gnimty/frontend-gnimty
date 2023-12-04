import { Link } from '@chakra-ui/next-js';
import { Flex } from '@chakra-ui/react';

import Back from '@/assets/icons/system/back.svg';
import Next from '@/assets/icons/system/next.svg';

import type { StackProps } from '@chakra-ui/react';

interface PaginationProps extends StackProps {
  currentPage: number;
  totalItems: number;
  maxItemsInPage: number;
}

export default function Pagination(props: PaginationProps) {
  const { currentPage, totalItems, maxItemsInPage, ...restProps } = props;

  const totalPages = Math.ceil(totalItems / maxItemsInPage);
  const currentPagination = Math.ceil(currentPage / 10);
  const currentPaginationPages = Math.min(totalPages - (currentPagination - 1) * 10, 10);
  // 첫번째 페이지네이션에서 0으로 계산되는 것을 방지하기 위해 `Math.max()` 사용
  const prevPaginationPage = Math.max((currentPagination - 1) * 10, 1);
  const nextPaginationPage = Math.min(currentPagination * 10 + 1, totalPages);

  return (
    <Flex justifyContent="space-between" alignItems="center" w="1080px" {...restProps}>
      <Link href={`/rankings?page=${prevPaginationPage}`} aria-label={`${prevPaginationPage}로 이동`} color="gray800">
        <Back width={24} height={24} aria-hidden css={{ display: 'block' }} />
      </Link>
      <Flex gap="12px">
        {Array.from({ length: currentPaginationPages }).map((_, i) => {
          const page = (currentPagination - 1) * 10 + i + 1;
          const isCurrentPage = page === currentPage;
          return (
            <Link
              key={page}
              href={`/rankings?page=${page}`}
              minW="24px"
              textStyle="t2"
              fontWeight={isCurrentPage ? 'bold' : 'normal'}
              color={isCurrentPage ? 'gray800' : 'gray500'}
              textAlign="center"
              textDecor="none"
            >
              {page}
            </Link>
          );
        })}
      </Flex>
      <Link href={`/rankings?page=${nextPaginationPage}`} aria-label={`${nextPaginationPage}로 이동`} color="gray800">
        <Next width={24} height={24} aria-hidden css={{ display: 'block' }} />
      </Link>
    </Flex>
  );
}
