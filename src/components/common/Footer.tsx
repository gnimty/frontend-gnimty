import Image from 'next/image';
import styled from 'styled-components';

import Logo from '../../assets/svg/icon.svg';

const FooterContainer = styled.footer`
  display: flex;
  padding: 40px 0px;
  justify-content: space-between;
  gap: 24px;
  max-width: 1080px;
  height: 116px;
  margin: 0 auto;
  align-items: center;
`;

const FooterWrapper = styled.div`
  display: flex;
  gap: 48px;
`;

const FooterItem = styled.a`
  text-decoration: none;
  font-family: Pretendard;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.colors.gray700};
`;

const Footer = () => {
  const footerList = [
    { id: 'faq', name: '공지사항', link: '/faq' },
    { id: 'teamIntroduction', name: '팀 소개', link: '/teamIntroduction' },
    { id: 'terms', name: '이용 약관', link: '/terms' },
    { id: 'policy', name: '개인정보처리방침', link: '/policy' },
  ];

  return (
    <FooterContainer>
      <div>
        <Image src={Logo} alt="logo" />
      </div>
      <FooterWrapper>
        {footerList.map((item) => {
          return (
            <FooterItem key={item.id} href={item.link}>
              {item.name}
            </FooterItem>
          );
        })}
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
