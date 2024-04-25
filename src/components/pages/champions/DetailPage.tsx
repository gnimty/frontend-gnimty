import { HStack, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import champions from '@/apis/constants/champions';
import { championComments } from '@/apis/queries/championComment';
import championDetailQuery from '@/apis/queries/championDetailQuery';
import championSkillsQuery from '@/apis/queries/championSkillsQuery';
import type { Position, PositionFilter } from '@/apis/types';

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
  queryLane?: Position;
}

export default function DetailPage({ championEnName, queryLane }: DetailPageProps) {
  const router = useRouter();
  const championId = champions.find(
    (champion) => champion.enName.toLowerCase() === championEnName.toLowerCase(),
  )!.championId;
  const championName =
    championId !== undefined
      ? championIdEnNameMap[championId]
      : championEnName.charAt(0).toUpperCase() + championEnName.slice(1);
  const [lane, setLane] = useState<PositionFilter | 'UNKNOWN' | ''>(queryLane ?? '');
  const { data, error } = useQuery(championDetailQuery({ championEnName: championName, lane }));
  const { data: skillData } = useQuery(championSkillsQuery({ championEnName: championName }));
  const { data: championCommentsData } = useQuery(championComments({ championId: championId ?? 1 }));
  const handleUpdateLane = (lane: PositionFilter) => setLane(lane);

  useEffect(() => {
    if (error?.response?.data.status.code === 404) {
      router.replace('/404');
    }
  }, [error, router]);

  return (
    <VStack w="1080px" m="0 auto" gap="12px" align="flex-start">
      {/* 챔피언 기본정보 */}
      {data?.data.championTier && (
        <ChampionBasicInfo
          championTier={data?.data.championTier}
          laneSelectRates={data?.data.laneSelectRates}
          lane={lane}
          handleUpdateLane={handleUpdateLane}
        />
      )}
      {/* 1 상대하기 쉬운/어려운 챔피언, 패치노트 */}
      <HStack w="full" h="410px" gap="12px" justify="space-between">
        <VStack w="50%" gap="12px" justify="space-between">
          <CounterChampions counterType="easy" counterChampions={data?.data.easyChampions} />
          <CounterChampions counterType="hard" counterChampions={data?.data.counterChampions} />
        </VStack>
        <PatchNotes patches={data?.data.patches} />
      </HStack>
      {/* 2 룬*/}
      <Runes perkBuilds={data?.data.perkBuilds} />
      {/* 3 스킬 빌드 */}
      <SkillBuild skillBuilds={data?.data.skillBuilds} skillData={skillData?.data[championName].spells} />
      {/* 4 소환사 주문, 시작 아이템, 첫 귀환, 신발 */}
      <HStack w="full" h="230px" gap="12px" justify="space-between">
        {/* 소환사 주문 */}
        <EarlyStageInfo type="summoner-spell" spellBuilds={data?.data.spellBuilds} />
        {/* 시작 아이템 */}
        <EarlyStageInfo type="start-item" initialItemBuilds={data?.data.initialItemBuilds} />
        {/* 첫 귀환 */}
        <EarlyStageInfo type="first-return" itemMiddleBuilds={data?.data.itemMiddleBuilds} />
        {/* 신발 */}
        <EarlyStageInfo type="shoes" shoesBuilds={data?.data.shoesBuilds} />
      </HStack>
      {/* 5 아이템 빌드, 소환사 랭킹 */}
      <HStack w="full" h="max-content" gap="12px" justify="space-between">
        <ItemBuild itemBuilds={data?.data.itemBuilds} />
        <SummonerRank specialists={data?.data.specialists} />
      </HStack>
      {/* 5 운영 팁 */}
      <Tip tipData={championCommentsData?.data.parentChampionComments} championId={championId} />
    </VStack>
  );
}
