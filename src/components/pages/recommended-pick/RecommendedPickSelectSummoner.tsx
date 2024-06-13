import { Box, HStack, Text, VStack, Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useState } from 'react';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import summonerMatchesInfoQuery from '@/apis/queries/summonerMatchesInfoQuery';
import type { MatchSummaryDto, ProfileEntry, SummonerDto } from '@/apis/types';
import profileIconUrl from '@/apis/utils/profileIconUrl';
import shortTierName from '@/apis/utils/shortTierName';
import ChampionIcon from '@/components/common/ChampionIcon';
import IconImage from '@/components/common/IconImage';
import TierImage from '@/components/common/TierImage';

import SearchBox from './SearchBox';

export interface RecommendedPickSelectSummonerProps {
  myProfile: ProfileEntry;
  // TODO: unknown을 구체적 타입으로 변경
  onSummonerChange: (newSummoner: unknown) => void;
}

export default function RecommendedPickSelectSummoner(props: RecommendedPickSelectSummonerProps) {
  const { myProfile, onSummonerChange } = props;
  const mainAccount = myProfile.riotDependentInfo.riotAccounts.find((account) => account.isMain);
  const { data: mainAccountMatchesInfoData } = useQuery(
    summonerMatchesInfoQuery({ summonerTagName: `${mainAccount?.name}-${mainAccount?.tagLine}` }),
  );
  const mainAccountProfile = mainAccountMatchesInfoData?.data.summoner;
  const mainAccountMatchSummary = mainAccountMatchesInfoData?.data.matchSummary;
  const [otherSummonerName, setOtherSummonerName] = useState('');
  const { data } = useQuery(summonerMatchesInfoQuery({ summonerTagName: otherSummonerName }));
  const otherProfile = data?.data.summoner;
  const otherProfileMatchSummary = data?.data.matchSummary;

  const resetOtherSummoner = () => {
    setOtherSummonerName('');
    onSummonerChange('');
  };

  const selectOtherSummoner = (summonerName: string) => {
    setOtherSummonerName(summonerName);
    onSummonerChange(summonerName);
  };

  return (
    <HStack w="full" h="260px" gap="24px">
      <SummonerCard summonerType="me" profile={mainAccountProfile} matchSummary={mainAccountMatchSummary} />
      {otherProfile ? (
        <SummonerCard
          summonerType="other"
          profile={otherProfile}
          matchSummary={otherProfileMatchSummary}
          resetOtherSummoner={resetOtherSummoner}
        />
      ) : (
        <Box w="528px" h="full" bg="white" borderRadius="4px" p="20px">
          <SearchBox selectOtherSummoner={selectOtherSummoner} />
        </Box>
      )}
    </HStack>
  );
}

interface SummonerCardProps {
  summonerType: 'me' | 'other';
  profile?: SummonerDto;
  matchSummary?: MatchSummaryDto;
  resetOtherSummoner?: () => void;
}

function SummonerCard({ summonerType, profile, matchSummary, resetOtherSummoner }: SummonerCardProps) {
  return (
    <VStack w="528px" h="full" bg="white" borderRadius="4px" p="20px" gap="20px">
      <HStack w="full" h="78px" gap="12px">
        <VStack w="78px" h="78px" position="relative" justify="center">
          <IconImage
            width={78}
            height={78}
            radius={999}
            src={profileIconUrl(profile?.profileIconId ?? 1)}
            alt="소환사 아이콘"
          />
          <Box
            position="absolute"
            bottom="0"
            minW="38px"
            p="1px 8px"
            borderRadius="20px"
            bgColor="gray800"
            color="white"
            textStyle="body"
          >
            {profile?.summonerLevel}
          </Box>
        </VStack>

        <VStack w="full" h="full" gap="12px">
          <HStack w="full" gap="12px">
            <Text textStyle="h2" color="gray800" fontWeight="700">
              {profile?.summonerName}
            </Text>
            <Text textStyle="h3" color="gray600" fontWeight="400">
              #{profile?.tagLine}
            </Text>
          </HStack>
          <HStack w="full" gap="8px">
            <TierImage tier={profile?.soloTierInfo?.tier ?? 'unknown'} width={28} height={28} />
            <Text textStyle="h3" color="gray800" fontWeight="700">
              {shortTierName(profile?.soloTierInfo?.tier ?? 'unknown', profile?.soloTierInfo?.division)}
            </Text>
            <Text textStyle="h3" color="gray500" fontWeight="400">
              {profile?.soloTierInfo?.lp}
            </Text>
          </HStack>
        </VStack>
        {/* TODO: 임시버튼 */}
        {summonerType === 'other' && (
          <Button
            type="button"
            alignSelf="flex-start"
            bgColor="gray800"
            color="white"
            p="4px 8px"
            borderRadius="20px"
            onClick={resetOtherSummoner}
          >
            다른 소환사로 변경
          </Button>
        )}
      </HStack>

      <VStack w="full" h="full" borderRadius="8px" p="16px 20px" gap="12px" bgColor="gray100" align="flex-start">
        <HStack gap="20px">
          <Text textStyle="t1" color="gray700" fontWeight="700">
            {matchSummary?.plays}전 {matchSummary?.wins}승 {matchSummary?.defeats}패
          </Text>
          {/* TODO: 매치전적에 챔피언서머리가 없는 경우 존재 */}
          <Text
            textStyle="t1"
            color={matchSummary?.isPerfect ? championScoreColor(10) : championScoreColor(matchSummary?.avgKda ?? 0)}
            fontWeight="700"
          >
            {matchSummary?.plays === 0
              ? ''
              : matchSummary?.isPerfect
                ? 'Perfect'
                : `${`${matchSummary?.avgKda} 평점` ?? 0}`}
          </Text>
        </HStack>
        <HStack w="full" justify="space-between">
          <HStack gap="12px">
            {matchSummary?.championSummary.map((championSummary, index) => (
              <Fragment key={index}>
                <ChampionIcon
                  championEnName={championIdEnNameMap[championSummary.championId]}
                  width={48}
                  height={48}
                  radius={24}
                />
                <VStack align="flex-start" gap="4px">
                  <Text textStyle="t1" color="gray800" fontWeight="700">
                    {(championSummary.winRate * 100).toFixed(2)}%
                  </Text>
                  <Text
                    textStyle="t2"
                    color={
                      championSummary.isPerfect ? championScoreColor(10) : championScoreColor(championSummary.avgKda)
                    }
                    fontWeight="400"
                  >
                    {championSummary.isPerfect ? 'Perfect' : `${`${championSummary.avgKda.toFixed(2)} 평점` ?? 0}`}
                  </Text>
                </VStack>
              </Fragment>
            ))}
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
}

const championScoreColor = (score: number | string) => {
  if (typeof score === 'number') {
    if (score < 3) {
      return 'gray600';
    }
    if (score < 5) {
      return 'green800';
    }
  }
  return 'orange800';
};
