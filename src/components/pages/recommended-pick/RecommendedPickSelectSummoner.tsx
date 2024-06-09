import { Box, HStack, Text, VStack, Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useState } from 'react';

import summonerInfoQuery from '@/apis/queries/summonerInfoQuery';
import type { ProfileEntry, SummonerDto } from '@/apis/types';
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
  // TODO: use onSummonerChange
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { myProfile, onSummonerChange } = props;
  const [otherSummonerName, setOtherSummonerName] = useState('');
  const { data } = useQuery(summonerInfoQuery({ summonerTagName: otherSummonerName }));
  const otherProfile = data?.data.summoner;

  const selectOtherSummoner = (summonerName: string) => setOtherSummonerName(summonerName);

  return (
    <HStack w="full" h="320px" gap="24px">
      <SummonerCard summonerType="me" myProfile={myProfile} />
      {otherProfile ? (
        <SummonerCard summonerType="other" otherProfile={otherProfile} />
      ) : (
        <SearchBox selectOtherSummoner={selectOtherSummoner} />
      )}
    </HStack>
  );
}

interface SummonerCardProps {
  summonerType: 'me' | 'other';
  myProfile?: ProfileEntry;
  otherProfile?: SummonerDto;
}

function SummonerCard({ summonerType, myProfile, otherProfile }: SummonerCardProps) {
  const summoner = summonerType === 'me' ? myProfile : otherProfile;
  return (
    <VStack w="528px" h="full" bg="white" borderRadius="4px" p="20px" gap="20px">
      <HStack w="full" h="78px" gap="12px">
        <Box w="78px" h="78px" position="relative">
          <IconImage width={78} height={78} radius={39} src={profileIconUrl(1)} alt="소환사 아이콘" />
          <Box
            position="absolute"
            bottom="0"
            left="0"
            minW="38px"
            p="1px 8px"
            borderRadius="20px"
            bgColor="gray800"
            color="white"
            textStyle="body"
          >
            000
          </Box>
        </Box>
        <VStack w="full" h="full" gap="12px">
          <HStack w="full" gap="12px">
            <Text textStyle="h2" color="gray800" fontWeight="700">
              T1 Gumayusi
            </Text>
            <Text textStyle="h3" color="gray600" fontWeight="400">
              #KR1
            </Text>
          </HStack>
          <HStack w="full" gap="8px">
            <TierImage tier="unknown" width={28} height={28} />
            <Text textStyle="h3" color="gray800" fontWeight="700">
              {shortTierName('grandmaster')}
            </Text>
            <Text textStyle="h3" color="gray500" fontWeight="400">
              0,000LP
            </Text>
          </HStack>
        </VStack>
        <VStack w="full" h="full" borderRadius="8px" p="16px 20px" gap="12px" align="flex-start">
          <HStack gap="20px">
            <Text textStyle="t1" color="gray700" fontWeight="700">
              20전 14승 6패
            </Text>
            <Text textStyle="t1" color={championScoreColor(3.3)} fontWeight="700">
              3.3평점
            </Text>
          </HStack>
          <HStack w="full" justify="space-between" bgColor="gray100">
            <HStack gap="12px">
              {Array(3).map((_, index) => (
                <Fragment key={index}>
                  <ChampionIcon championEnName="Xerath" width={48} height={48} radius={24} />
                  <VStack align="flex-start" gap="4px">
                    <Text textStyle="t1" color="gray800" fontWeight="700">
                      100%
                    </Text>
                    <Text textStyle="t2" color={championScoreColor(8.0)} fontWeight="400">
                      8.00 평점
                    </Text>
                  </VStack>
                </Fragment>
              ))}
            </HStack>
          </HStack>
        </VStack>
        {summonerType === 'other' && (
          <Button
            w="full"
            h="48px"
            bgColor="gray800"
            p="14px 12px"
            borderRadius="4px"
            textStyle="t2"
            color="white"
            fontWeight="700"
            textAlign="center"
          >
            다른 소환사로 변경하기
          </Button>
        )}
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
