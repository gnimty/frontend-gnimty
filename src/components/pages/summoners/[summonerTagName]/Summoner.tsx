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
import { useRouter } from 'next/router';
import { useRef } from 'react';

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
import StatusIndicator from '@/components/common/StatusIndicator';
import TierImage from '@/components/common/TierImage';
import FavoriteIcon from '@/components/icons/FavoriteIcon';
import copyText from '@/utils/copyText';
import summonerDtoToSearchPopRowItem from '@/utils/summonerDtoToSearchPopRowItem';

import { useFavoriteSummonerMapStore } from '../../main/search/favoriteSummonerMapStore';
import { useRecentSearchesStore } from '../../main/search/recentSearchesStore';

import Champion from './Champion';
import CurrentGameTab from './CurrentGameTab/CurrentGameTab';
import LanePlaysGraph from './LanePlaysGraph';
import RankCard from './RankCard';

dayjs.locale('ko');
dayjs.extend(relativeTime);
dayjs.extend(duration);

interface SummonerProps {
  summonerTagName: string;
}

export default function Summoner(props: SummonerProps) {
  const { summonerTagName } = props;

  const { data, status, error } = useQuery(summonerMatchesInfoQuery({ summonerTagName }));

  const { renewSummoner, status: renewSummonerStatus } = useRenewSummoner();

  const addRecentSearch = useRecentSearchesStore((state) => state.addRecentSearch);
  const isRecentSearchAdded = useRef(false);

  const favoriteSummonerMap = useFavoriteSummonerMapStore((state) => state.favoriteSummonerMap);
  const toggleFavoriteSummoner = useFavoriteSummonerMapStore((state) => state.toggleFavoriteSummoner);

  const router = useRouter();

  if (status === 'error' && error.response?.data.status.code === 404) {
    router.replace('/404');
    return;
  }

  if (status !== 'success') {
    return;
  }

  const searchPopRowItem = summonerDtoToSearchPopRowItem(data.data.summoner);
  const isFavorite = Object.hasOwn(favoriteSummonerMap, searchPopRowItem.puuid);

  if (!isRecentSearchAdded.current) {
    isRecentSearchAdded.current = true;
    addRecentSearch(searchPopRowItem);
  }

  return (
    <>
      <Head>
        <title key="title">{data.data.summoner.summonerName} - 게임 전적</title>
      </Head>
      <VStack gap="40px" w="1080px" m="40px auto 60px">
        <HStack gap="12px" w="full">
          <VStack
            gap={0}
            alignItems="normal"
            alignSelf="stretch"
            w="447px"
            bg="white"
            p="20px"
            justify="space-between"
            borderRadius="4px"
          >
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
                        await copyText(
                          `${data.data.summoner.summonerName}#${data.data.summoner.tagLine}`,
                          '소환사 이름을 성공적으로 복사하였습니다.',
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
                  <TierImage tier={data.data.summoner.soloTierInfo?.tier ?? 'unknown'} width={28} height={28} />
                  <Text textStyle="h3" color="gray800" fontWeight="bold">
                    {fullTierName(
                      data.data.summoner.soloTierInfo?.tier ?? 'unknown',
                      data.data.summoner.soloTierInfo?.division,
                    )}
                  </Text>
                  {data.data.summoner.soloTierInfo !== null && (
                    <Text textStyle="h3" fontWeight="regular" color="gray500">
                      {Intl.NumberFormat().format(data.data.summoner.soloTierInfo.lp)}
                      LP
                    </Text>
                  )}
                </HStack>
                <HStack>
                  <Button
                    type="button"
                    onClick={() => {
                      toggleFavoriteSummoner(searchPopRowItem);
                    }}
                    display="flex"
                    borderWidth="1px"
                    borderColor="gray400"
                    borderStyle={isFavorite ? 'none' : 'solid'}
                    borderRadius="20px"
                    p="4px 10px 4px 8px"
                    gap="4px"
                    bg={isFavorite ? 'main' : 'transparent'}
                  >
                    <FavoriteIcon width={20} height={20} color={isFavorite ? '#fff' : '#4e4e4e'} isOn={isFavorite} />
                    <Text textStyle="t2" fontWeight="regular" color={isFavorite ? 'white' : 'gray700'}>
                      즐겨찾기
                    </Text>
                  </Button>
                  <HStack border="1px solid" borderColor="gray400" borderRadius="20px" p="4px 10px 4px 8px" gap="4px">
                    <Like width={20} height={20} css={(theme) => ({ color: theme.colors.gray600 })} />
                    <Text textStyle="t2" fontWeight="regular" color="gray700">
                      {/* TODO: API에 관련 정보 추가해달라고 요청해야함 */}
                      {Intl.NumberFormat().format(1234)}
                    </Text>
                  </HStack>
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
                  isDisabled={renewSummonerStatus === 'pending'}
                  _disabled={{
                    cursor: 'wait',
                    bg: 'gray200',
                    color: 'gray500',
                  }}
                  onClick={() => {
                    renewSummoner(
                      { puuid: data.data.summoner.puuid },
                      {
                        onSuccess() {
                          alert('성공적으로 소환사 정보가 갱신됐습니다!');
                          // TODO: 페이지 새로고침 대신 `invalidateQueries()`를 사용해 데이터 갱신
                          router.reload();
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
                >
                  {renewSummonerStatus === 'pending' ? '갱신중' : '전적 갱신'}
                </Button>
                <Button size="lg" variant="default" flex="1 1 0" display="inline-flex" gap="4px">
                  <Chat width={24} height={24} aria-hidden /> 채팅하기
                </Button>
              </HStack>
            </VStack>
          </VStack>
          <VStack gap="12px" flex="1">
            <HStack gap="12px" w="full">
              <RankCard tierType="solo" tierInfo={data.data.summoner.soloTierInfo} />
              <RankCard tierType="flex" tierInfo={data.data.summoner.flexTierInfo} />
            </HStack>
            <VStack alignItems="normal" gap="12px" bg="white" w="full" p="20px" borderRadius="4px">
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
                      <HStack key={champion.championId} gap="12px" alignItems="normal">
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
                          <Text textStyle="caption" fontWeight="normal" color="gray800">
                            {champion.wins}승 {champion.defeats}패
                          </Text>
                          <Text w="60px" textStyle="body" color="orange800" fontWeight="bold">
                            {champion.isPerfect ? 'Perfect' : `${champion.avgKda.toFixed(2)} 평점`}
                          </Text>
                        </VStack>
                      </HStack>
                    ))}
                  </HStack>
                </VStack>
                <LanePlaysGraph laneSummary={data.data.matchSummary.laneSummary} />
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
            <TabPanel>
              <Champion summonerTagName={summonerTagName} />
            </TabPanel>
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
