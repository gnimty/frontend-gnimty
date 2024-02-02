import { useRouter } from 'next/router';

import Summoner from '@/components/pages/summoners/[summonerTagName]/Summoner';

export default function SummonerRoute() {
  const router = useRouter();

  if (!router.isReady || typeof router.query.summonerTagName !== 'string') {
    return;
  }

  const { summonerTagName } = router.query;

  return (
    <>
      {/*
       * summonerId를 이용해 사용자 정보를 fetch하여 페이지의 <title />을
       * 동적으로 지정 해야하므로 모든 로직을 한 곳에 담기 위해
       * <Summoner /> 컴포넌트 안에서 <title />을 지정
       */}
      <Summoner summonerTagName={summonerTagName} />
    </>
  );
}
