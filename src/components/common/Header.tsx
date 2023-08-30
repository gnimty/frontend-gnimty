import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';

interface MenuItemProps {
  isActive: boolean;
}

const HeaderContainer = styled.header`
  display: flex;
  width: 1080px;
  padding: 28px 0px;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

const MenuContainer = styled.div`
  display: flex;
  gap: 40px;
`;

const MenuItem = styled.a<MenuItemProps>`
  text-decoration: none;
  font-family: Pretendard;
  font-size: 16px;
  line-height: 22px;
  color: ${(props) => (props.isActive ? props.theme.colors.gray800 : props.theme.colors.gray600)};

  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  const isLoggedIn = false;
  const [activeMenu, setActiveMenu] = useState('홈');

  const menuItemList = [
    { id: 'home', name: '홈', link: '/' },
    { id: 'duo', name: '듀오찾기', link: '/duo' },
    { id: 'champion', name: '챔피언 분석', link: '/champion' },
    { id: 'statistics', name: '통계', link: '/statistics' },
    { id: 'ranking', name: '랭킹', link: '/ranking' },
    { id: 'pick', name: 'Pick 추천', link: '/pick' },
  ];

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <HeaderContainer>
      <MenuContainer>
        {menuItemList.map((item) => {
          return (
            <MenuItem
              key={item.id}
              href={item.link}
              isActive={activeMenu === `${item.name}`}
              onClick={() => handleMenuClick(`${item.name}`)}
            >
              {item.name}
            </MenuItem>
          );
        })}
      </MenuContainer>

      <Button size="medium" color="white" background="black">
        {isLoggedIn ? '로그아웃' : '로그인'}
      </Button>
    </HeaderContainer>
  );
};

export default Header;
