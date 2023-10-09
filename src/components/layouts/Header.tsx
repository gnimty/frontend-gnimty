import Link from 'next/link';
import { useState } from 'react';

import Button from '../common/Button';

import * as style from './Header.style';

const menuItemList = [
  { id: 'home', name: '홈', link: '/' },
  { id: 'duo', name: '듀오찾기', link: '/duo' },
  { id: 'champion', name: '챔피언 분석', link: '/champion' },
  { id: 'statistics', name: '통계', link: '/statistics' },
  { id: 'ranking', name: '랭킹', link: '/ranking' },
  { id: 'pick', name: 'Pick 추천', link: '/pick' },
];

const Header = () => {
  const isLoggedIn = false;
  const [activeMenu, setActiveMenu] = useState('홈');

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <header css={style.headerRoot}>
      <nav css={style.nav}>
        {menuItemList.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            onClick={() => handleMenuClick(item.name)}
            css={style.link({ isActive: activeMenu === item.name })}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <Button size="medium" color="white" background="black">
        {isLoggedIn ? '로그아웃' : '로그인'}
      </Button>
    </header>
  );
};

export default Header;
