import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import type { ProfileEntry } from '@/apis/types';
import BlockManagementTab from '@/components/pages/mypage/blockManagement/BlockManagementTab';
import ChangeStateTab from '@/components/pages/mypage/changeState/ChangeStateTab';
import UserInfoTab from '@/components/pages/mypage/userInfo/UserInfoTab';
import UserProfileCard from '@/components/pages/mypage/UserProfileCard';

export default function MyPage() {
  const myProfile: ProfileEntry = {
    id: 2,
    email: 'help@gnimty.com',
    nickname: '힝구링퐁퐁퐁퐁',
    upCount: 0,
    riotDependentInfo: {
      isLinked: false,
      status: 'OFFLINE',
      introductions: [
        {
          id: 1,
          content: '테스트 소개 1',
          isMain: true,
        },
        {
          id: 2,
          content: '테스트 소개 2',
          isMain: false,
        },
      ],
      schedules: [
        {
          dayOfWeek: 'SUNDAY',
          startTime: 19,
          endTime: 23,
        },
      ],
      preferGameModes: [
        {
          gameMode: 'RANK_FLEX',
        },
        {
          gameMode: 'RANK_SOLO',
        },
      ],
      riotAccounts: [
        {
          id: 0,
          name: '힝구링퐁퐁퐁퐁',
          tagLine: '#KR1',
          isMain: true,
          puuid: 0,
          queue: 'grandmaster',
          lp: 0,
          division: 1,
          mmr: 0,
          frequentLane1: 'TOP',
          frequentLane2: 'TOP',
          frequentChampionId1: 0,
          frequentChampionId2: 0,
          frequentChampionId3: 0,
          queueFlex: 'gold',
          lpFlex: 0,
          divisionFlex: 0,
          mmrFlex: 0,
          frequentLane1Flex: 'TOP',
          frequentLane2Flex: 'TOP',
          frequentChampionId1Flex: 0,
          frequentChampionId2Flex: 0,
          frequentChampionId3Flex: 0,
          iconId: 0,
        },
      ],
    },
    oauthInfos: [],
  };

  if (myProfile) {
    const mainAccount = myProfile.riotDependentInfo.riotAccounts.find((account) => account.isMain);

    const stateTabInfo = {
      status: myProfile.riotDependentInfo.status,
      introductions: myProfile.riotDependentInfo.introductions,
      preferGameModes: myProfile.riotDependentInfo.preferGameModes,
      schedules: myProfile.riotDependentInfo.schedules,
    };

    return (
      <Flex m="40px auto 60px" w="1080px" flexDir="row" gap="40px">
        <UserProfileCard
          nickname={mainAccount?.name ?? myProfile.nickname}
          tag={mainAccount?.tagLine ?? ''}
          tier={mainAccount?.queue ?? 'unknown'}
          leaguePoints={mainAccount?.lp ?? 0}
          email={myProfile.email}
        />
        <Tabs variant="line" flex={1}>
          <TabList gap="12px">
            <Tab w="76px">회원 정보</Tab>
            <Tab w="76px">상태 변경</Tab>
            <Tab w="76px">차단 관리</Tab>
          </TabList>
          <TabPanels pt="24px">
            <TabPanel>
              <UserInfoTab />
            </TabPanel>
            <TabPanel>
              <ChangeStateTab initialValues={stateTabInfo} />
            </TabPanel>
            <TabPanel>
              <BlockManagementTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    );
  }
}
