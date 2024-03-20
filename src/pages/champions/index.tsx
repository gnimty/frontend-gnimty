import Head from 'next/head';

import ChampionsPage from '@/components/pages/champions/ChampionsPage';

export default function ChampionsRoute() {
  return (
    <>
      <Head>
        <title>챔피언 분석</title>
      </Head>
      <ChampionsPage />
    </>
  );
}
