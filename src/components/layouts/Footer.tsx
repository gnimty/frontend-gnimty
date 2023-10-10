import styled from '@emotion/styled';

import Logo from '../common/Logo';

import * as style from './Footer.style';

const LinkDivider = styled.div((props) => ({
  width: '1px',
  height: '16px',
  background: props.theme.colors.gray300,
}));

const Footer = () => (
  <footer css={style.footerRoot}>
    <div css={style.footerTop}>
      <Logo width={77} height={36} css={style.logo} />
      <nav css={style.nav}>
        {/* TODO: 링크 추가하기 */}
        <a href="" css={style.link}>
          공지사항
        </a>
        <LinkDivider />
        <a href="" css={style.link}>
          팀 소개
        </a>
        <LinkDivider />
        <a href="" css={style.link}>
          이용약관
        </a>
        <LinkDivider />
        <a href="" css={style.link}>
          개인정보처리방침
        </a>
      </nav>
    </div>
    <p css={style.riotPolicies}>
      {
        '© 2023 logo. logo isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends.\nLeague of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.'
      }
    </p>
  </footer>
);

export default Footer;
