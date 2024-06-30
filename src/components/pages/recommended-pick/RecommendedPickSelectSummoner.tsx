import { Box, Button, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { Fragment, useState } from 'react';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import summonerMatchesInfoQuery from '@/apis/queries/summonerMatchesInfoQuery';
import type { MatchSummaryDto, ProfileEntry, SummonerDto } from '@/apis/types';
import useRenewSummoner from '@/apis/useRenewSummoner';
import profileIconUrl from '@/apis/utils/profileIconUrl';
import shortTierName from '@/apis/utils/shortTierName';
import ChangeIcon from '@/assets/icons/system/change.svg';
import Reset from '@/assets/icons/system/reset.svg';
import ChampionIcon from '@/components/common/ChampionIcon';
import IconImage from '@/components/common/IconImage';
import TierImage from '@/components/common/TierImage';

import SearchBox from './SearchBox';

import type { SearchPopRowItem } from '../main/search/SearchPopRow';

export interface RecommendedPickSelectSummonerProps {
  myProfile: ProfileEntry;
  onSummonerChange: (newSummoner: SearchPopRowItem | null) => void;
  onResetButtonClick: () => void;
}

export default function RecommendedPickSelectSummoner(props: RecommendedPickSelectSummonerProps) {
  const { myProfile, onSummonerChange, onResetButtonClick } = props;
  const mainAccount = myProfile.riotDependentInfo.riotAccounts.find((account) => account.isMain);
  const { data: mainAccountMatchesInfoData } = useQuery(
    summonerMatchesInfoQuery({ summonerTagName: `${mainAccount?.name}-${mainAccount?.tagLine}` }),
  );
  const mainAccountProfile = mainAccountMatchesInfoData?.data.summoner;
  const mainAccountMatchSummary = mainAccountMatchesInfoData?.data.matchSummary;

  const [otherSummonerTagName, setOtherSummonerTagName] = useState('');
  const { data } = useQuery(summonerMatchesInfoQuery({ summonerTagName: otherSummonerTagName }));
  const otherProfile = data?.data.summoner;
  const otherProfileMatchSummary = data?.data.matchSummary;

  const resetOtherSummoner = () => {
    setOtherSummonerTagName('');
    onSummonerChange(null);
  };

  const handleResetButtonClick = () => {
    onResetButtonClick();
    resetOtherSummoner();
  };

  const selectOtherSummoner = (searchPopRowItem: SearchPopRowItem) => {
    setOtherSummonerTagName(`${searchPopRowItem.summonerName}-${searchPopRowItem.tagLine}`);
    onSummonerChange(searchPopRowItem);
  };

  return (
    <HStack w="full" h="320px" gap="24px">
      <SummonerCard summonerType="me" profile={mainAccountProfile} matchSummary={mainAccountMatchSummary} />
      {otherProfile ? (
        <SummonerCard
          summonerType="other"
          profile={otherProfile}
          matchSummary={otherProfileMatchSummary}
          onResetButtonClick={handleResetButtonClick}
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
  onResetButtonClick?: () => void;
}

function SummonerCard({ summonerType, profile, matchSummary, onResetButtonClick }: SummonerCardProps) {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const { renewSummoner } = useRenewSummoner();
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
              {profile?.soloTierInfo?.lp && `${profile?.soloTierInfo?.lp} LP`}
            </Text>
          </HStack>
        </VStack>

        {summonerType === 'other' && (
          <Button
            aria-label="다른 소환사로 변경"
            type="button"
            alignSelf="flex-start"
            h="24px"
            onClick={onResetButtonClick}
            display="flex"
            alignItems="center"
            gap="4px"
          >
            <ChangeIcon width="24px" height="24px" />
            <Text textStyle="t1" color="gray600" fontWeight="400">
              소환사 변경
            </Text>
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

      <HStack w="full" h="48px" gap="12px">
        <IconButton
          aria-label="정보 최신화"
          type="button"
          w="48px"
          h="48px"
          border="1px solid"
          borderColor="gray200"
          borderRadius="4px"
          onClick={() => {
            renewSummoner(
              { puuid: profile!.puuid },
              {
                onSuccess() {
                  alert('성공적으로 소환사 정보가 갱신됐습니다!');
                  // TODO: 페이지 새로고침 대신 `invalidateQueries()`를 사용해 데이터 갱신
                  queryClient.invalidateQueries({
                    queryKey: [
                      'summonerMatchesInfo',
                      { summonerTagName: `${profile?.summonerName}-${profile?.tagLine}` },
                    ],
                  });
                },
                onError(error) {
                  // 소환사에 대한 요청이 너무 많습니다. n초 후에 다시 시도해주세요. 에러
                  if (error.response?.data.status.code === 429) {
                    alert(error.response.data.status.message);
                  }
                },
              },
            );
          }}
          icon={<Reset width="24" height="24" />}
        />
        <Link
          href={`/summoners/${profile?.summonerName}-${profile?.tagLine}`}
          css={{
            fontSize: theme.fonts.t2.fontSize,
            lineHeight: theme.fonts.t2.lineHeight,
            fontWeight: 700,
            color: 'white',
            backgroundColor: theme.colors.gray800,
            padding: '14px 12px',
            flex: '1 0 0',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
          }}
        >
          자세히 보기
        </Link>
      </HStack>
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
