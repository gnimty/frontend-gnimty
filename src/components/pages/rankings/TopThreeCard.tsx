import { Link } from '@chakra-ui/next-js';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import Image from 'next/image';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import type { SummonerRankDto } from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';
import championSplashUrl from '@/apis/utils/championSplashUrl';
import profileIconUrl from '@/apis/utils/profileIconUrl';
import shortTierName from '@/apis/utils/shortTierName';
import firstPlaceFrame from '@/assets/images/first-place-frame.png';
import secondPlaceFrame from '@/assets/images/second-place-frame.png';
import thirdPlaceFrame from '@/assets/images/third-place-frame.png';
import PositionImage from '@/components/common/position-image/PositionImage';
import TierImage from '@/components/common/TierImage';

import type { StaticImageData } from 'next/image';

type Ranking = 1 | 2 | 3;

interface TopThreeCardProps {
  summonerRank: SummonerRankDto;
}

const frameMap: Record<Ranking, StaticImageData> = {
  1: firstPlaceFrame,
  2: secondPlaceFrame,
  3: thirdPlaceFrame,
};

export default function TopThreeCard(props: TopThreeCardProps) {
  const { summonerRank } = props;

  if (summonerRank.rank < 1 || summonerRank.rank > 3) {
    return;
  }

  const winPercentage = Math.floor(summonerRank.tierInfo.winRate * 100);
  const defeatPercentage = 100 - winPercentage;

  return (
    <Box w="352px" h="210px">
      <Flex w="352px" h="202px" gap="20px" p="28px 0 4px 28px" pos="relative">
        {summonerRank.tierInfo.mostChampionIds.length > 0 && (
          <Image
            src={championSplashUrl(summonerRank.tierInfo.mostChampionIds[0])}
            alt=""
            fill
            css={{
              objectPosition: '140px',
              zIndex: -1,
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
            }}
          />
        )}
        <Box
          pos="absolute"
          top={0}
          left={0}
          zIndex={-1}
          w="full"
          h="full"
          bg="linear-gradient(90deg, #fff 51.04%, rgb(255 255 255 / 0.6) 77.08%, rgb(255 255 255 / 0) 100%)"
          borderTopLeftRadius="4px"
          borderTopRightRadius="4px"
        />
        <Box pos="relative">
          <Image
            src={profileIconUrl(summonerRank.profileIconId)}
            alt=""
            width={56}
            height={56}
            css={{
              borderRadius: '9999px',
            }}
          />
          <Image
            src={frameMap[summonerRank.rank as Ranking]}
            alt=""
            css={{ position: 'absolute', top: '-18px', left: '-9px' }}
          />
        </Box>
        <Flex flexDir="column" gap="16px">
          <Flex flexDir="column" gap="4px">
            <Text
              textStyle="h3"
              fontWeight="bold"
              color="gray800"
              w="202px"
              textOverflow="ellipsis"
              overflowX="hidden"
              whiteSpace="nowrap"
            >
              <Link
                href={`/summoners/${summonerRank.summonerName}-${summonerRank.tagLine}`}
                color="inherit"
                textDecor="none"
              >
                {summonerRank.summonerName}
              </Link>
            </Text>
            <HStack gap="4px">
              <TierImage tier={summonerRank.tierInfo.tier} width={24} height={24} />
              <Box w="36px" textStyle="t2" fontWeight="bold" textAlign="center" color="gray800">
                {shortTierName(summonerRank.tierInfo.tier, summonerRank.tierInfo.division)}
              </Box>
              <Box textStyle="t2" fontWeight="normal" color="gray500">
                {Intl.NumberFormat().format(summonerRank.tierInfo.lp)}LP
              </Box>
            </HStack>
            <HStack gap="8px">
              {summonerRank.tierInfo.mostLanes.slice(0, 2).map((lane) => (
                <PositionImage key={lane} position={lane} width={24} height={24} />
              ))}
            </HStack>
          </Flex>
          <HStack gap="8px">
            {summonerRank.tierInfo.mostChampionIds.map((championId) => (
              <Image
                key={championId}
                src={championIconUrl(championIdEnNameMap[championId])}
                alt=""
                width={32}
                height={32}
                css={{
                  borderRadius: '999px',
                }}
              />
            ))}
          </HStack>
          <HStack gap="4px">
            <Flex gap="2px" textStyle="t2" fontWeight="normal" color="gray600">
              <Box>W</Box>
              <Box w="28px">{summonerRank.tierInfo.wins}</Box>
            </Flex>
            <Flex gap="2px" textStyle="t2" fontWeight="normal" color="gray600">
              <Box>L</Box>
              <Box w="28px">{summonerRank.tierInfo.defeats}</Box>
            </Flex>
            <Box textStyle="t1" fontWeight="bold" color="blue800">
              {winPercentage.toString().padStart(2, '0')}%
            </Box>
          </HStack>
        </Flex>
      </Flex>
      <Flex h="8px">
        <Box
          role="meter"
          aria-label="승률"
          aria-valuenow={winPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          w={`${winPercentage}%`}
          bg="blue800"
          borderBottomLeftRadius="4px"
        />
        <Box
          role="meter"
          aria-label="패배율"
          aria-valuenow={defeatPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          flex="1 1 0"
          bg="red800"
          borderBottomRightRadius="4px"
        />
      </Flex>
    </Box>
  );
}
