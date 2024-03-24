import { HStack, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import championDetailQuery from '@/apis/queries/championDetailQuery';

import ChampionBasicInfo from './ChampionBasicInfo';
import CounterChampions from './CounterChampions';
import EarlyStageInfo from './EarlyStageInfo';
import ItemBuild from './ItemBuild';
import PatchNotes from './PatchNotes';
import Runes from './Runes';
import SkillBuild from './SkillBuild';
import SummonerRank from './SummonerRank';
import Tip from './tip/Tip';

interface DetailPageProps {
  championEnName: string;
}

export default function DetailPage({ championEnName }: DetailPageProps) {
  const capitalizedChampionEnName = championEnName.charAt(0).toUpperCase() + championEnName.slice(1);
  const { data } = useQuery(championDetailQuery({ championEnName: capitalizedChampionEnName }));
  return (
    <VStack w="1080px" m="0 auto" gap="12px" align="flex-start">
      {/* 챔피언 기본정보 */}
      {/* TODO: <ChampionBasicInfo /> */}
      {/* 1 상대하기 쉬운/어려운 챔피언, 패치노트 */}
      <HStack w="full" gap="12px" justify="space-between">
        <VStack w="50%" gap="12px" justify="space-between">
          <CounterChampions counterType="easy" counterChampions={data?.data.easyChampions} />
          <CounterChampions counterType="hard" counterChampions={data?.data.counterChampions} />
        </VStack>
        <PatchNotes patches={data?.data.patches} />
      </HStack>
      {/* 2 룬*/}
      <Runes />
      {/* 3 스킬 빌드 */}
      <SkillBuild />
      {/* 4 소환사 주문, 시작 아이템, 첫 귀환, 신발 */}
      <HStack w="full" gap="12px" justify="space-between">
        {/* 소환사 주문 */}
        <EarlyStageInfo type="summoner-spell" />
        {/* 시작 아이템 */}
        <EarlyStageInfo type="start-item" />
        {/* 첫 귀환 */}
        <EarlyStageInfo type="first-return" />
        {/* 신발 */}
        <EarlyStageInfo type="shoes" />
      </HStack>
      {/* 5 아이템 빌드, 소환사 랭킹 */}
      <HStack w="full" h="max-content" gap="12px" justify="space-between">
        <ItemBuild itemBuilds={data?.data.itemBuilds} />
        <SummonerRank specialists={data?.data.specialists} />
      </HStack>
      {/* 5 운영 팁 */}
      <Tip />
    </VStack>
  );
}
