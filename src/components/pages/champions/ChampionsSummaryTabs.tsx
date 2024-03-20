import { Link } from '@chakra-ui/next-js';
import { Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import championIdKrNameMap from '@/apis/constants/championIdKrNameMap';
import championIconUrl from '@/apis/utils/championIconUrl';
import PositionImage from '@/components/common/position-image/PositionImage';
import Unselected from '@/components/common/position-image/Unselected';

export default function ChampionsSummaryTabs() {
  const [tabIndex, setTabIndex] = useState(0);

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
        {/* TODO: 챔피언을 포지션별로 받아올 수 있는 백엔드 API 필요할듯 */}
        <TabPanel>TOP</TabPanel>
        <TabPanel>JGL</TabPanel>
        <TabPanel>MID</TabPanel>
        <TabPanel>BTM</TabPanel>
        <TabPanel>SUP</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
