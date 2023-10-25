import { useDisclosure } from '@chakra-ui/hooks';

import LoginModal from '@/components/pages/account/LoginModal';

import ActiveLink from '../common/ActiveLink';

import * as style from './Header.style';

// TODO: 링크 정해지면 추가하기
const links = [
  { name: '홈', link: '/' },
  { name: '듀오 찾기', link: '' },
  { name: '챔피언 분석', link: '' },
  { name: '랭킹', link: '' },
  { name: '할인/패치노트', link: '' },
];

export default function Header() {
  const { isOpen: isOpenLoginModal, onOpen: onOpenLoginModal, onClose: onCloseLoginModal } = useDisclosure();

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

        {/* TODO: 디자인 시스템 버튼을 제대로 구현하면 그 때 컴포넌트 교체 */}
        <button type="button" css={style.loginButton} onClick={onOpenLoginModal}>
          로그인
        </button>
      </header>
      <LoginModal isOpen={isOpenLoginModal} onClose={onCloseLoginModal} />
    </>
  );
}
