import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import championIdKrNameMap from '@/apis/constants/championIdKrNameMap';
import championsTierQuery from '@/apis/queries/championsTierQuery';
import type { ChampionTierDto } from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';
import ChampionTierBadge from '@/components/common/ChampionTierBadge';

import * as style from './ChampionsTable.style';

interface ChampionTabPanelProps {
  champions: ChampionTierDto[];
}

function ChampionTabPanel(props: ChampionTabPanelProps) {
  const { champions } = props;

  return (
    <TabPanel>
      <table css={style.championsTable}>
        <thead css={style.tableHeadBody}>
          <tr css={style.tableRow}>
            <th css={[style.tableHeader, style.textLeft]}>No.</th>
            <th css={[style.tableHeader, style.textLeft]}>챔피언</th>
            <th css={[style.tableHeader, style.textCenter]}>티어</th>
            <th css={[style.tableHeader, style.textCenter]}>승률</th>
            <th css={[style.tableHeader, style.textCenter]}>픽률</th>
          </tr>
        </thead>
        <tbody css={style.tableHeadBody}>
          {champions.slice(0, 5).map((champion, i) => (
            <tr key={champion.championId} css={style.tableRow}>
              <td css={style.championRanking}>{i + 1}</td>
              <td css={style.championNameAndImage}>
                <Image
                  src={championIconUrl(championIdEnNameMap[champion.championId])}
                  alt=""
                  width={32}
                  height={32}
                  css={style.championImage}
                />
                <span css={style.championName}>{championIdKrNameMap[champion.championId]}</span>
              </td>
              <td css={style.championTier}>
                <ChampionTierBadge tier={champion.tier} />
              </td>
              <td css={style.percent}>{(champion.winRate * 100).toFixed(2)}%</td>
              <td css={style.percent}>{(champion.pickRate * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TabPanel>
  );
}

export default function ChampionsTable() {
  const { data, status } = useQuery(championsTierQuery({ brief: true }));

  if (status !== 'success') {
    return;
  }

  return (
    <article css={style.championsRoot}>
      <Tabs>
        <header css={style.championsHeader}>
          <h2 css={style.championsTitle}>챔피언 분석</h2>
          <TabList position="absolute" top={0} right="20px" height="53px">
            <Flex gap="12px">
              <Tab width="40px">탑</Tab>
              <Tab width="40px">정글</Tab>
              <Tab width="40px">미드</Tab>
              <Tab width="40px">원딜</Tab>
              <Tab width="40px">서포터</Tab>
            </Flex>
          </TabList>
        </header>
        <TabPanels>
          {(['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY'] as const).map((position) => (
            <ChampionTabPanel key={position} champions={data.data.champions[position]} />
          ))}
        </TabPanels>
      </Tabs>
    </article>
  );
}
