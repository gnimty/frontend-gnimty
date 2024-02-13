import { useDisclosure } from '@chakra-ui/hooks';
import { Button } from '@chakra-ui/react';

import AccountModal from '@/components/pages/account/AccountModal';
import { useAuthContext } from '@/contexts/AuthContext';

import ActiveLink from '../common/ActiveLink';

import * as style from './Header.style';

// TODO: 링크 정해지면 추가하기
const links = [
  { name: '홈', link: '/' },
  { name: '듀오 찾기', link: '/duo' },
  { name: '챔피언 분석', link: '' },
  { name: '랭킹', link: '/rankings?page=1' },
  { name: '할인/패치노트', link: '/information' },
];

export default function Header() {
  const { isOpen: isOpenLoginModal, onOpen: onOpenLoginModal, onClose: onCloseLoginModal } = useDisclosure();
  const { isAuthenticated } = useAuthContext();

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

        {!isAuthenticated && (
          <Button variant="default" size="md" width="80px" onClick={onOpenLoginModal}>
            로그인
          </Button>
        )}
      </header>
      <AccountModal isOpen={isOpenLoginModal} onClose={onCloseLoginModal} />
    </>
  );
}
