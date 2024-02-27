import 'dayjs/locale/ko';

import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import Head from 'next/head';
import Image from 'next/image';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import championIdKrNameMap from '@/apis/constants/championIdKrNameMap';
import summonerMatchesInfoQuery from '@/apis/queries/summonerMatchesInfoQuery';
import useRenewSummoner from '@/apis/useRenewSummoner';
import championIconUrl from '@/apis/utils/championIconUrl';
import fullTierName from '@/apis/utils/fullTierName';
import profileIconUrl from '@/apis/utils/profileIconUrl';
import Chat from '@/assets/icons/system/chat.svg';
import Copy from '@/assets/icons/system/copy.svg';
import Like from '@/assets/icons/system/like.svg';
import PositionImage from '@/components/common/position-image/PositionImage';
import StatusIndicator from '@/components/common/StatusIndicator';
import TierImage from '@/components/common/TierImage';
import proportionalValue from '@/utils/proportionalValue';

import CurrentGameTab from './CurrentGameTab/CurrentGameTab';
import RankCard from './RankCard';

dayjs.locale('ko');
dayjs.extend(relativeTime);
dayjs.extend(duration);

interface SummonerProps {
  summonerTagName: string;
}

export default function Summoner(props: SummonerProps) {
  const { summonerTagName } = props;

  const { data, status } = useQuery(summonerMatchesInfoQuery({ summonerTagName }));

  const { renewSummoner } = useRenewSummoner();

  if (status !== 'success') {
    return;
  }

  return (
    <>
      <Head>
        <title key="title">{data.data.summoner.summonerName} - 게임 전적</title>
      </Head>
      <VStack gap="40px" w="1080px" m="40px auto 60px">
        <HStack gap="12px" w="full">
          <VStack alignItems="normal" w="447px" h="264px" bg="white" p="20px" gap="12px">
            <HStack alignItems="normal" gap="24px">
              <Box pos="relative" width="100px" height="100px">
                <Image
                  src={profileIconUrl(data.data.summoner.profileIconId)}
                  alt=""
                  fill
                  css={{ borderRadius: '999px' }}
                />
                <Flex
                  pos="absolute"
                  bottom={0}
                  left="50%"
                  transform="translate(-50%, 50%)"
                  p="1px 8px 1px 8px"
                  borderRadius="20px"
                  bg="gray800"
                  color="white"
                  alignItems="center"
                  justifyContent="center"
                  textStyle="body"
                  fontWeight="regular"
                >
                  {data.data.summoner.summonerLevel}
                </Flex>
              </Box>
              <VStack alignItems="start">
                <HStack gap="12px">
                  <HStack gap="4px">
                    <Text
                      textStyle="h2"
                      fontWeight="bold"
                      color="gray800"
                      maxW="230px"
                      textOverflow="ellipsis"
                      overflowX="hidden"
                      whiteSpace="nowrap"
                    >
                      {data.data.summoner.summonerName}
                    </Text>
                    <IconButton
                      display="inline-flex"
                      aria-label="소환사명 복사"
                      onClick={async () => {
                        await navigator.clipboard.writeText(
                          `${data.data.summoner.summonerName}#${data.data.summoner.tagLine}`,
                        );
                      }}
                    >
                      <Copy width={16} height={16} aria-hidden="true" />
                    </IconButton>
                  </HStack>
                  {/* TODO: API에 유저 활동상태 추가 부탁드린다고 백엔드 분들께 말씀 드려야 함.  */}
                  <StatusIndicator status="AWAY" />
                </HStack>
                <Text color="gray600" textStyle="h3" fontWeight="regular">
                  #{data.data.summoner.tagLine}
                </Text>
                <HStack gap="8px">
                  <TierImage tier={data.data.summoner.soloTierInfo.tier} width={28} height={28} />
                  <Text textStyle="h3" color="gray800" fontWeight="bold">
                    {fullTierName(data.data.summoner.soloTierInfo.tier, data.data.summoner.soloTierInfo.division)}
                  </Text>
                  <Text textStyle="h3" fontWeight="regular" color="gray500">
                    {Intl.NumberFormat().format(data.data.summoner.soloTierInfo.lp)}
                    LP
                  </Text>
                </HStack>
                <HStack border="1px solid" borderColor="gray400" borderRadius="20px" p="4px 10px 4px 8px" gap="4px">
                  <Like width={20} height={20} css={(theme) => ({ color: theme.colors.gray600 })} />
                  <Text textStyle="t2" fontWeight="regular" color="gray700">
                    {/* TODO: API에 관련 정보 추가해달라고 요청해야함 */}
                    {Intl.NumberFormat().format(1234)}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <VStack alignItems="normal" gap="8px">
              <HStack gap="8px">
                <Text textStyle="body" fontWeight="regular" color="gray500">
                  마지막 갱신
                </Text>{' '}
                <Text textStyle="body" fontWeight="bold" color="gray500">
                  {dayjs(data.data.renewableAfter).from(dayjs())}
                </Text>
              </HStack>
              <HStack gap="12px">
                <Button
                  size="lg"
                  variant="unstyled"
                  bg="black"
                  color="white"
                  flex="1 1 0"
                  onClick={() => {
                    // TODO: 로딩 처리와 성공 혹은 에러 시 유저에게 피드백 필요
                    renewSummoner({ puuid: data.data.summoner.puuid });
                  }}
                >
                  전적 갱신
                </Button>
                <Button size="lg" variant="default" flex="1 1 0" display="inline-flex" gap="4px">
                  <Chat width={24} height={24} aria-hidden /> 채팅하기
                </Button>
              </HStack>
            </VStack>
          </VStack>
          <VStack gap="12px" flex="1">
            <HStack gap="12px" h="112px" w="full">
              <RankCard
                tierType="solo"
                tier={data.data.summoner.soloTierInfo.tier}
                division={data.data.summoner.soloTierInfo.division}
                lp={data.data.summoner.soloTierInfo.lp}
                // TODO: API에 순위 정보가 추가 되면 같이 업데이트 필요
                rank={1}
              />
              {data.data.summoner.flexTierInfo !== null && (
                <RankCard
                  tierType="flex"
                  tier={data.data.summoner.flexTierInfo.tier}
                  division={data.data.summoner.flexTierInfo.division}
                  lp={data.data.summoner.flexTierInfo.lp}
                  // TODO: API에 순위 정보가 추가 되면 같이 업데이트 필요
                  rank={1}
                />
              )}
            </HStack>
            <VStack alignItems="normal" gap="12px" bg="white" h="140px" w="full" p="20px" borderRadius="4px">
              <Text textStyle="t2" fontWeight="regular" color="gray700">
                최근 게임 결과
              </Text>
              <HStack justifyContent="space-between">
                <VStack gap="12px" alignItems="normal">
                  <HStack gap="20px">
                    <Text textStyle="t2" fontWeight="bold" color="gray700">
                      {data.data.matchSummary.plays}전 {data.data.matchSummary.wins}승 {data.data.matchSummary.defeats}
                      패
                    </Text>
                    <Text textStyle="t2" fontWeight="bold" color="green800">
                      {data.data.matchSummary.isPerfect
                        ? 'Perfect'
                        : `${data.data.matchSummary.avgKda.toFixed(2)} 평점`}
                    </Text>
                  </HStack>
                  <HStack gap="20px">
                    {data.data.matchSummary.championSummary.map((champion) => (
                      <HStack key={champion.avgKda} gap="12px" alignItems="normal">
                        <Image
                          src={championIconUrl(championIdEnNameMap[champion.championId])}
                          width={36}
                          height={36}
                          alt={championIdKrNameMap[champion.championId]}
                          css={{ borderRadius: '999px' }}
                        />
                        <VStack alignItems="normal" gap={0}>
                          <Text w="48px" textStyle="t2" color="gray800" fontWeight="bold">
                            {Math.floor(champion.winRate * 100)}%
                          </Text>
                          <Text w="60px" textStyle="body" color="orange800" fontWeight="bold">
                            {champion.avgKda.toFixed(2)} 평점
                          </Text>
                        </VStack>
                      </HStack>
                    ))}
                  </HStack>
                </VStack>
                <VStack gap={0}>
                  <HStack gap="20px">
                    {/* TODO: 이 부분 백엔드에서 라인별 데이터 보내달라고 해야 함 */}
                    <Box w="12px" h="48px" bg="gray200" pos="relative">
                      <Box
                        w="full"
                        bg="red800"
                        h={`${proportionalValue(100, 0.5 * 100, 48)}px`}
                        pos="absolute"
                        bottom="0"
                      />
                    </Box>
                    <Box w="12px" h="48px" bg="gray200" pos="relative">
                      <Box
                        w="full"
                        bg="red800"
                        h={`${proportionalValue(100, 0.2 * 100, 48)}px`}
                        pos="absolute"
                        bottom="0"
                      />
                    </Box>
                    <Box w="12px" h="48px" bg="gray200" pos="relative">
                      <Box
                        w="full"
                        bg="red800"
                        h={`${proportionalValue(100, 0.9 * 100, 48)}px`}
                        pos="absolute"
                        bottom="0"
                      />
                    </Box>
                    <Box w="12px" h="48px" bg="gray200" pos="relative">
                      <Box
                        w="full"
                        bg="red800"
                        h={`${proportionalValue(100, 0.4 * 100, 48)}px`}
                        pos="absolute"
                        bottom="0"
                      />
                    </Box>
                    <Box w="12px" h="48px" bg="gray200" pos="relative">
                      <Box
                        w="full"
                        bg="red800"
                        h={`${proportionalValue(100, 0.01 * 100, 48)}px`}
                        pos="absolute"
                        bottom="0"
                      />
                    </Box>
                  </HStack>
                  <HStack gap="16px" pt="4px" px="8px" borderTop="1px solid" borderColor="gray500">
                    <PositionImage position="TOP" width={16} height={16} />
                    <PositionImage position="JUNGLE" width={16} height={16} />
                    <PositionImage position="MIDDLE" width={16} height={16} />
                    <PositionImage position="BOTTOM" width={16} height={16} />
                    <PositionImage position="UTILITY" width={16} height={16} />
                  </HStack>
                </VStack>
              </HStack>
            </VStack>
          </VStack>
        </HStack>
        <Tabs display="flex" flexDir="column" gap="12px" w="full">
          <TabList pos="relative" gap="30px" boxShadow="inset 0 -1px 0 0" color="gray300">
            <Tab>전적 정보</Tab>
            <Tab>챔피언 정보</Tab>
            <Tab>인게임</Tab>
            <Tab>그님티 정보</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>전적 정보</TabPanel>
            <TabPanel>챔피언 정보</TabPanel>
            <TabPanel>
              <CurrentGameTab summonerTagName={summonerTagName} />
            </TabPanel>
            <TabPanel>그님티 정보</TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </>
  );
}
