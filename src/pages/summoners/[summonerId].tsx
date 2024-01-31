import Head from 'next/head';

import Summoner from '@/components/pages/summoners/[summonerId]/Summoner';

export default function SummonerRoute() {
  return (
    <>
      <Head>
        <title>[소환사명] - 게임 전적</title>
      </Head>
      <Summoner />
    </>
  );
}
