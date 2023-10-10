import Logo from '../common/Logo';

import * as style from './Footer.style';

// TODO: 링크 정해지면 추가하기
const links = [
  { name: '공지사항', link: '' },
  { name: '팀 소개', link: '' },
  { name: '이용 약관', link: '' },
  { name: '개인정보처리방침', link: '' },
];

const Footer = () => (
  <footer css={style.footerRoot}>
    <div css={style.footerTop}>
      <Logo width={77} height={36} css={style.logo} />
      <nav css={style.nav}>
        {links.map((link) => (
          <div key={link.name} css={style.linkWrapper}>
            <a href={link.link} css={style.link}>
              {link.name}
            </a>
          </div>
        ))}
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
