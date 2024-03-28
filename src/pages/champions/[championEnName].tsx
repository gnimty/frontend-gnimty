import Head from 'next/head';
import { useRouter } from 'next/router';

import champions from '@/apis/constants/champions';
import DetailPage from '@/components/pages/champions/DetailPage';

export default function ChampionDetail() {
  const router = useRouter();

  if (!router.isReady || typeof router.query.championEnName !== 'string') {
    return;
  }

  const { championEnName } = router.query;

  const krName = champions.find((champion) => champion.enName.toLowerCase() === championEnName.toLowerCase())?.krName;

  return (
    <>
      <Head>
        <title>{krName} - 그님티</title>
      </Head>
      <DetailPage championEnName={championEnName} />
    </>
  );
}
