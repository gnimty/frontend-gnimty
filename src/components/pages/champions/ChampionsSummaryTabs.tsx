import { Link } from '@chakra-ui/next-js';
import { Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import championIdKrNameMap from '@/apis/constants/championIdKrNameMap';
import championsTierQuery from '@/apis/queries/championsTierQuery';
import type { ChampionTierDto, PositionFilter } from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';
import PositionImage from '@/components/common/position-image/PositionImage';
import Unselected from '@/components/common/position-image/Unselected';
import gnimtyChampionUrl from '@/utils/gnimtyChampionUrl';

function ChampionsSummaryTab(props: { position: PositionFilter; champions: ChampionTierDto[] }) {
  const { position, champions } = props;

  return (
    <Grid as="ul" gap="8px" templateColumns="repeat(6, 1fr)" justifyItems="center">
      {champions
        .sort((a, b) => championIdKrNameMap[a.championId].localeCompare(championIdKrNameMap[b.championId]))
        .map((champion) => (
          <GridItem as="li" key={champion.championId}>
            <Link
              href={gnimtyChampionUrl(champion.championName, position)}
              display="flex"
              flexDir="column"
              gap="4px"
              textDecor="none"
              alignItems="center"
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
                maxW="38px"
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
                    href={gnimtyChampionUrl(championIdEnNameMap[parseInt(championId, 10)])}
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
        {(
          [
            // TODO: 백엔드에서 ALL 데이터를 받아올 수 있게 되면 윗 부분을 삭제하고 밑에 코드 코멘트 해제
            // 'ALL',
            'TOP',
            'JUNGLE',
            'MIDDLE',
            'BOTTOM',
            'UTILITY',
          ] as const
        ).map((position) => (
          <TabPanel key={position}>
            <ChampionsSummaryTab position={position} champions={data.data.champions[position]} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
