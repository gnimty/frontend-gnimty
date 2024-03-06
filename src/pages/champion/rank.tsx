import Head from 'next/head';

import RankPage from '@/components/pages/champion/RankPage';

export default function ChampionRank() {
  return (
    <>
      <Head>
        <title>챔피언 분석</title>
      </Head>
      <RankPage />
    </>
  );
}
