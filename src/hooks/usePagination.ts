import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function isPositive(str: string): boolean {
  return /^[1-9]\d*$/.test(str);
}

export default function usePagination() {
  const [page, setPage] = useState<number | undefined>(undefined);

  const router = useRouter();
  const { page: pageStr } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (pageStr === undefined) {
      setPage(1);
    } else if (typeof pageStr === 'string' && isPositive(pageStr)) {
      setPage(parseInt(pageStr, 10));
    } else {
      router.replace('/404');
    }
  }, [pageStr, router]);

  return page;
}
