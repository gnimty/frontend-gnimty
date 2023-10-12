import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Image from 'next/image';

import championsPerPosition from '@/api/mocks/championsPerPosition';
import type { Position } from '@/api/types';
import ChampionTierBadge from '@/components/common/ChampionTierBadge';

import * as style from './ChampionsTable.style';

interface ChampionTabPanelProps {
  position: Position;
}

/*
 * TODO: 후에 API 요청 받아올 때는 activePosition도 하나 받아가지고
 * position !== activePosition과 다르다면 API 요청을 하지 않도록 설정
 */

function ChampionTabPanel(props: ChampionTabPanelProps) {
  const { position } = props;

  const champions = championsPerPosition[position];

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
          {champions.map((champion, i) => (
            <tr key={champion.name} css={style.tableRow}>
              <td css={style.championRanking}>{i + 1}</td>
              <td css={style.championNameAndImage}>
                <Image src={champion.image} alt="" width={32} height={32} css={style.championImage} />
                <span css={style.championName}>{champion.name}</span>
              </td>
              <td css={style.championTier}>
                <ChampionTierBadge tier={champion.tier} />
              </td>
              <td css={style.percent}>{champion.winPercent}%</td>
              <td css={style.percent}>{champion.pickRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TabPanel>
  );
}

const positions: Position[] = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY'];

export default function ChampionsTable() {
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
          {positions.map((position) => (
            <ChampionTabPanel key={position} position={position} />
          ))}
        </TabPanels>
      </Tabs>
    </article>
  );
}
