'use client';
import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import useGetMyInfo from '@/apis/useGetMyInfo';
import BlockManagementTab from '@/components/pages/mypage/blockManagement/BlockManagementTab';
import ChangeStateTab from '@/components/pages/mypage/changeState/ChangeStateTab';
import UserInfoTab from '@/components/pages/mypage/userInfo/UserInfoTab';
import UserProfileCard from '@/components/pages/mypage/UserProfileCard';

export default function MyPage() {
  const myProfile = useGetMyInfo();

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
        <Tabs flex={1}>
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
