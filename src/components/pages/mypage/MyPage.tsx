import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import type { Tier } from '@/apis/types';
import BlockManagementTab from '@/components/pages/mypage/blockManagement/BlockManagementTab';
import ChangeStateTab from '@/components/pages/mypage/changeState/ChangeStateTab';
import UserInfoTab from '@/components/pages/mypage/userInfo/UserInfoTab';
import UserProfileCard from '@/components/pages/mypage/UserProfileCard';

export default function MyPage() {
  const user = {
    nickname: '힝구링퐁퐁퐁퐁',
    tier: 'grandmaster' as Tier,
    leaguePoints: 1110,
    email: 'help@gnimty.com',
  };

  return (
    <Flex m="102px auto 60px" w="1080px" flexDir="row" gap="40px">
      <UserProfileCard nickname={user.nickname} tier={user.tier} leaguePoints={user.leaguePoints} email={user.email} />
      <Tabs variant="line" flex={1}>
        <TabList gap="12px">
          <Tab w="76px">회원 정보</Tab>
          <Tab w="76px">상태 변경</Tab>
          <Tab w="76px">차단 관리</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserInfoTab />
          </TabPanel>
          <TabPanel>
            <ChangeStateTab />
          </TabPanel>
          <TabPanel>
            <BlockManagementTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
