import styled from 'styled-components';

import Exit from '@/assets/icons/system/exit.svg';
import theme from '@/styles/theme';

import Button from '../common/Button';

const Container = styled.div<{ $open: boolean }>`
  width: 26rem;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  display: ${({ $open }) => ($open ? 'block' : 'none')};
`;

const Header = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.25rem;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fonts.t1.fontSize};
  font-weight: 700;
  line-height: ${({ theme }) => theme.fonts.t1.lineHeight};
`;

const Content = styled.div`
  width: 23.5rem;
  margin: 1.25rem;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 1.25rem;
  width: 23.5rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface DetailFilterProps {
  detailOpen: boolean;
  toggleDetail: () => void;
}

function DetailFilter({ detailOpen, toggleDetail }: DetailFilterProps) {
  return (
    <Container $open={detailOpen}>
      <Header>
        <Title>상세 필터</Title>
        <button onClick={toggleDetail}>
          <Exit />
        </button>
      </Header>
      <Content />
      <ButtonWrapper>
        <Button size="medium" color={theme.colors.gray500} background={theme.colors.white}>
          초기화
        </Button>
        <Button size="large" color={theme.colors.red800} background={theme.colors.white}>
          저장
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

export default DetailFilter;
