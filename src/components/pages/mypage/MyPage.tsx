'use client';
import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import useAuth from '@/apis/useAuth';
import BlockManagementTab from '@/components/pages/mypage/blockManagement/BlockManagementTab';
import ChangeStateTab from '@/components/pages/mypage/changeState/ChangeStateTab';
import UserInfoTab from '@/components/pages/mypage/userInfo/UserInfoTab';
import UserProfileCard from '@/components/pages/mypage/UserProfileCard';
import type { MyPageRouteProps } from '@/pages/mypage/[tab]';

enum MyPageTabIndexEnum {
  info = 0,
  'change-state' = 1,
  'manage-block' = 2,
}

export default function MyPage(props: MyPageRouteProps) {
  const { tab } = props;

  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, isAuthenticated, status } = useAuth();

  // TODO: use isAuthenticated only
  if (!isAuthenticated || status !== 'success') {
    return;
  }

  const myProfile = data.data;

  const mainAccount = myProfile.riotDependentInfo.riotAccounts.find((account) => account.isMain);

  return (
    <Flex m="40px auto 60px" w="1080px" flexDir="row" gap="40px">
      <UserProfileCard
        nickname={mainAccount?.name ?? myProfile.nickname}
        tag={mainAccount?.tagLine ?? ''}
        tier={mainAccount?.queue ?? 'unknown'}
        division={mainAccount?.division ?? undefined}
        leaguePoints={mainAccount?.lp ?? 0}
        email={myProfile.email}
      />
      <Tabs
        isManual
        isLazy
        index={MyPageTabIndexEnum[tab]}
        onChange={(newIndex) => {
          router.push({
            pathname: `/mypage/${MyPageTabIndexEnum[newIndex]}`,
            query: Object.fromEntries(searchParams.entries()),
          });
          newIndex;
        }}
        flex={1}
      >
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
            <ChangeStateTab
              initialIntroduction={myProfile.riotDependentInfo.introduction}
              initialPreferGameModes={myProfile.riotDependentInfo.preferGameModes}
              initialSchedules={myProfile.riotDependentInfo.schedules}
              initialStatus={myProfile.riotDependentInfo.status}
            />
          </TabPanel>
          <TabPanel>
            <BlockManagementTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
