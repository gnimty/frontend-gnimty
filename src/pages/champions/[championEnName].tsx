import Head from 'next/head';
import { useRouter } from 'next/router';

import DetailPage from '@/components/pages/champions/DetailPage';

export default function ChampionDetail() {
  const router = useRouter();

  if (!router.isReady || typeof router.query.championEnName !== 'string') {
    return;
  }

  const { championEnName } = router.query;

  return (
    <>
      <Head>
        <title>{championEnName} - 그님티</title>
      </Head>
      <DetailPage championEnName={championEnName} />
    </>
  );
}
