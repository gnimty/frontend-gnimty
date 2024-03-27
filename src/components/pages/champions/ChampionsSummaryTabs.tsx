import { Link } from '@chakra-ui/next-js';
import { Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import championIdKrNameMap from '@/apis/constants/championIdKrNameMap';
import championsTierQuery from '@/apis/queries/championsTierQuery';
import type { ChampionTierDto } from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';
import PositionImage from '@/components/common/position-image/PositionImage';
import Unselected from '@/components/common/position-image/Unselected';

function ChampionsSummaryTab(props: { champions: ChampionTierDto[] }) {
  const { champions } = props;

  return (
    <Grid as="ul" gap="8px" templateColumns="repeat(6, 1fr)" justifyItems="center">
      {champions
        /**
         * TODO: `??` 연산자는 현재 챔피언 한글 이름이 지정되어 있지 않은 챔피언 때문에 임시로 사용함.
         * 후에 챔피언 관련 정보를 동적으로 받아올 수 있게 코드가 리팩터링 된 후에 필요없는 `??` 연산자 삭제.
         */
        .sort((a, b) => (championIdKrNameMap[a.championId] ?? '').localeCompare(championIdKrNameMap[b.championId]))
        .map((champion) => (
          <GridItem as="li" key={champion.championId}>
            <Link
              href={`/champions/${champion.championName}`}
              display="flex"
              flexDir="column"
              gap="4px"
              textDecor="none"
            >
              <Image
                src={championIconUrl(champion.championName)}
                alt={championIdKrNameMap[champion.championId]}
                width={40}
                height={40}
                css={{
                  borderRadius: '999px',
                }}
              />
              <Text
                w="40px"
                textStyle="body"
                fontWeight="regular"
                color="gray700"
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {championIdKrNameMap[champion.championId]}
              </Text>
            </Link>
          </GridItem>
        ))}
    </Grid>
  );
}

export default function ChampionsSummaryTabs() {
  const [tabIndex, setTabIndex] = useState(0);

  const { data, status } = useQuery(championsTierQuery());

  if (status !== 'success') {
    return;
  }

  return (
    <Tabs
      variant="multipleTab"
      tabIndex={tabIndex}
      onChange={(newTabIndex) => {
        setTabIndex(newTabIndex);
      }}
    >
      <TabList>
        <Tab>
          <Unselected fill={tabIndex === 0 ? '#fff' : undefined} width={20} height={20} />
        </Tab>
        <Tab>
          <PositionImage fill={tabIndex === 1 ? '#fff' : undefined} position="TOP" width={20} height={20} />
        </Tab>
        <Tab>
          <PositionImage fill={tabIndex === 2 ? '#fff' : undefined} position="JUNGLE" width={20} height={20} />
        </Tab>
        <Tab>
          <PositionImage fill={tabIndex === 3 ? '#fff' : undefined} position="MIDDLE" width={20} height={20} />
        </Tab>
        <Tab>
          <PositionImage fill={tabIndex === 4 ? '#fff' : undefined} position="BOTTOM" width={20} height={20} />
        </Tab>
        <Tab>
          <PositionImage fill={tabIndex === 5 ? '#fff' : undefined} position="UTILITY" width={20} height={20} />
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          {/* TODO: 백엔드에서 ALL 데이터를 받아올 수 있게 되면 이 부분을 삭제하고 밑에 표시해둔 곳 코멘트 해제 */}
          <Grid as="ul" gap="8px" templateColumns="repeat(6, 1fr)" justifyItems="center">
            {Object.entries(championIdKrNameMap)
              .sort(([, aName], [, bName]) => aName.localeCompare(bName))
              .map(([championId, championKrName]) => (
                <GridItem as="li" key={championId}>
                  <Link
                    href={`/champions/${championKrName}`}
                    display="flex"
                    flexDir="column"
                    gap="4px"
                    textDecor="none"
                  >
                    <Image
                      src={championIconUrl(championIdEnNameMap[parseInt(championId, 10)])}
                      alt={championKrName}
                      width={40}
                      height={40}
                      css={{
                        borderRadius: '999px',
                      }}
                    />
                    <Text
                      w="40px"
                      textStyle="body"
                      fontWeight="regular"
                      color="gray700"
                      textOverflow="ellipsis"
                      overflow="hidden"
                      whiteSpace="nowrap"
                    >
                      {championKrName}
                    </Text>
                  </Link>
                </GridItem>
              ))}
          </Grid>
        </TabPanel>
        {[
          // TODO: 백엔드에서 ALL 데이터를 받아올 수 있게 되면 윗 부분을 삭제하고 밑에 코드 코멘트 해제
          // data.data.champions.ALL,
          data.data.champions.TOP,
          data.data.champions.JUNGLE,
          data.data.champions.MIDDLE,
          data.data.champions.BOTTOM,
          data.data.champions.UTILITY,
        ].map((champions, i) => (
          // 위의 배열의 순서는 런타임에서 변경될 일이 절대 없기 때문에 인덱스를 key로 사용
          <TabPanel key={i}>
            <ChampionsSummaryTab champions={champions} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
