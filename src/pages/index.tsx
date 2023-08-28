import styled from 'styled-components';

const MainWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.orange600};
  font-size: ${(props) => props.theme.fonts.h1.fontSize};
`;

export default function Home() {
  return <MainWrapper>메인페이지ㅇㅇㅇ</MainWrapper>;
}
