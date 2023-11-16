import Head from 'next/head';

import Rankings from '@/components/pages/rankings/Rankings';

export default function RankingsRoute() {
  return (
    <>
      <Head>
        <title>소환사 랭킹</title>
      </Head>
      <Rankings />
    </>
  );
}
