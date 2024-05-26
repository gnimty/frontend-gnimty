import { Button, Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import useAuth from '@/apis/useAuth';
import { logout } from '@/apis/useLogout';
import IconLike from '@/assets/icons/system/like.svg';
import ProfileImage from '@/components/common/ProfileImage';
import Select from '@/components/common/select/Select';
import AccountModal from '@/components/pages/account/AccountModal';

import ActiveLink from '../common/ActiveLink';
import SummonerSearchBar from '../common/SummonerSearchBar';
import { useAccountModalStore } from '../pages/account/accountModalStore';
import RecommendsModal from '../recommends/Recommends';

import * as style from './Header.style';

const links = [
  { name: '홈', link: '/' },
  { name: '듀오 찾기', link: '/duo' },
  { name: '챔피언 분석', link: '/champions' },
  { name: '랭킹', link: '/rankings?page=1' },
  { name: '할인/패치노트', link: '/information' },
];

export default function Header() {
  const openAccountModal = useAccountModalStore((s) => s.open);
  const { isOpen: isOpenRecommends, onOpen: onOpenRecommends, onClose: onCloseRecommends } = useDisclosure();
  const { data: myInfoData, isAuthenticated } = useAuth();

  const router = useRouter();
  const onSelect = async (value: string) => {
    switch (value) {
      case 'mypage':
        return router.push('/mypage/info');
      case 'logout':
        logout().then(() => router.reload());
    }
  };

  return (
    <>
      <header css={style.headerRoot}>
        <nav css={style.nav}>
          {links.map((link) => (
            <ActiveLink
              key={link.name}
              href={link.link}
              inActiveCSS={style.link({ isActive: false })}
              activeCSS={style.link({ isActive: true })}
            >
              {link.name}
            </ActiveLink>
          ))}
        </nav>

        {/* TODO: use only isAuthenticated */}
        {isAuthenticated && myInfoData !== undefined ? (
          <Flex position="relative" gap="8px">
            {router.pathname !== '/' && <SummonerSearchBar size="in-header" />}
            <Flex w="40px" h="40px" justifyContent="center" alignContent="center">
              <IconButton w="28px" aria-label="search" icon={<IconLike />} onClick={onOpenRecommends} />
            </Flex>
            <Flex w="40px" h="40px" justifyContent="center" alignContent="center">
              <Select
                options={[
                  { text: '마이페이지', value: 'mypage' },
                  { text: '로그아웃', value: 'logout' },
                ]}
                onChange={onSelect}
                CustomSelectButton={({ toggleDropdown }) => (
                  <ProfileImage
                    iconId={
                      myInfoData.data.riotDependentInfo.riotAccounts.find((account) => account.isMain)?.iconId ?? 1
                    }
                    width={40}
                    height={40}
                    onClick={toggleDropdown}
                  />
                )}
                css={{
                  'div:last-child': {
                    top: 'calc(100% + 8px)',
                    right: '10px',
                    width: '124px',
                  },
                }}
              />
            </Flex>
          </Flex>
        ) : (
          <Button variant="default" size="md" width="80px" onClick={openAccountModal}>
            로그인
          </Button>
        )}
      </header>
      <AccountModal />
      {/* TODO: summonerSearchBar 활성 시 제거 */}
      {isAuthenticated && <RecommendsModal isOpen={isOpenRecommends} onClose={onCloseRecommends} />}
    </>
  );
}
