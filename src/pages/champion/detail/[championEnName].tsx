import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ChampionDetail() {
  const router = useRouter();

  if (!router.isReady || typeof router.query.championEnName !== 'string') {
    return;
  }

  const { championEnName } = router.query;

  return (
    <Head>
      <title>{championEnName} - 그님티</title>
    </Head>
  );
}
