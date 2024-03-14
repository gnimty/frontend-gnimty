import { HStack, VStack } from '@chakra-ui/react';

import ChampionBasicInfo from './ChampionBasicInfo';
import CounterChampions from './CounterChampions';
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
  return (
    <VStack w="1080px" m="0 auto" gap="12px" align="flex-start">
      {/* 챔피언 기본정보 */}
      <ChampionBasicInfo />
      {/* 1 상대하기 쉬운/어려운 챔피언, 패치노트 */}
      <HStack w="full" gap="12px" justify="space-between">
        <VStack gap="12px" justify="space-between">
          <CounterChampions counterType="easy" />
          <CounterChampions counterType="hard" />
        </VStack>
        <PatchNotes />
      </HStack>
      {/* 2 룬*/}
      <Runes />
      {/* 3 스킬 빌드 */}
      <SkillBuild />
      {/* 4 아이템 빌드, 소환사 랭킹 */}
      <HStack w="full" gap="12px" justify="space-between">
        <ItemBuild />
        <SummonerRank />
      </HStack>
      {/* 5 운영 팁 */}
      <Tip />
    </VStack>
  );
}
