import styled from '@emotion/styled';
import React, { useState } from 'react';

import Exit from '@/assets/icons/system/exit.svg';
import Button from '@/components/common/Button';
import Radio from '@/components/common/Radio';
import Search from '@/components/common/Search';
import Champion from '@/components/duo/Champion';
import { championNames, type ChampionName } from '@/constants/champions';
import theme from '@/styles/theme';

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
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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

const DetailFilterRow = styled.div`
  width: 23.5rem;
  margin: 0 auto;
  min-height: 5.5rem;
  max-height: max-content;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const DetailFilterRowHeader = styled.div<{ $direction: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  align-items: ${({ $direction }) => ($direction === 'row' ? 'center' : 'flex-start')};
  justify-content: ${({ $direction }) => ($direction === 'row' ? 'flex-start' : 'center')};
  gap: 4px;
`;

const DetailFilterRowTitle = styled.h4`
  color: ${({ theme }) => theme.colors.gray800};
  font-size: ${({ theme }) => theme.fonts.body.fontSize};
  line-height: ${({ theme }) => theme.fonts.body.lineHeight};
  font-weight: 700;
`;

const DetailFilterRowAddition = styled.div`
  color: ${({ theme }) => theme.colors.gray600};
  font-size: ${({ theme }) => theme.fonts.body.fontSize};
  line-height: ${({ theme }) => theme.fonts.body.lineHeight};
  font-weight: 400;
`;

const DetailFilterRowContent = styled.div<{ $flexColumn?: boolean; $justify?: boolean }>`
  height: max-content;
  display: flex;
  flex-direction: ${({ $flexColumn }) => ($flexColumn ? 'column' : 'row')};
  align-items: center;
  justify-content: ${({ $justify }) => ($justify ? 'space-between' : 'flex-start')};
  gap: 0.75rem;
`;

const ChampionsWrapper = styled.div`
  width: 100%;
  min-height: 0;
  max-height: 8.25rem;
  overflow-y: scroll;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const DetailCheckBoxWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  input[type='checkbox'] {
    accent-color: ${({ theme }) => theme.colors.red800};
    width: 15px;
    height: 15px;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
  }
  span {
    font-size: ${({ theme }) => theme.fonts.t2.fontSize};
    line-height: ${({ theme }) => theme.fonts.t2.lineHeight};
    font-weight: 400;
    color: ${({ theme }) => theme.colors.gray800};
  }
`;

interface DetailFilterProps {
  detailOpen: boolean;
  toggleDetail: () => void;
}

interface Champion {
  championName: ChampionName;
  selected: boolean;
}

function DetailFilter({ detailOpen, toggleDetail }: DetailFilterProps) {
  const [filteredChampions, setFilteredChampions] = useState<Champion[]>([]);
  const handleChampionSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const searchedChampions = championNames.filter((championName) => championName.includes(value));
    setFilteredChampions(searchedChampions.map((championName) => ({ championName, selected: false })));
  };
  const handleChampionClick = (championName: ChampionName) => {
    setFilteredChampions((prev) => {
      if (prev.filter(({ selected }) => selected).length >= 7) {
        return prev;
      }
      return prev.map((champion) => {
        if (champion.championName === championName) {
          return { ...champion, selected: !champion.selected };
        }
        return champion;
      });
    });
  };
  return (
    <Container $open={detailOpen}>
      <Header>
        <Title>상세 필터</Title>
        <button onClick={toggleDetail}>
          <Exit />
        </button>
      </Header>
      <Content>
        <DetailFilterRow>
          <DetailFilterRowHeader $direction="row">
            <DetailFilterRowTitle>선호 챔피언</DetailFilterRowTitle>
            <DetailFilterRowAddition>최대 7개</DetailFilterRowAddition>
          </DetailFilterRowHeader>
          <DetailFilterRowContent $flexColumn>
            <Search
              width="100%"
              height="2.5rem"
              radius="2.5rem"
              placeholder="챔피언을 검색하세요."
              onChange={handleChampionSearch}
            />
            {/* champions */}
            <ChampionsWrapper>
              {filteredChampions
                .filter(({ selected }) => !selected)
                .map(({ championName }) => (
                  <Champion key={championName} championName={championName} onClick={handleChampionClick} />
                ))}
            </ChampionsWrapper>
            {/* selected champions */}
            <ChampionsWrapper>
              {filteredChampions
                .filter(({ selected }) => selected)
                .map(({ championName, selected }) => (
                  <Champion
                    key={championName}
                    championName={championName}
                    onClick={handleChampionClick}
                    selected={selected}
                  />
                ))}
            </ChampionsWrapper>
          </DetailFilterRowContent>
        </DetailFilterRow>
        <DetailFilterRow>
          <DetailFilterRowHeader $direction="column">
            <DetailFilterRowTitle>정렬 기준</DetailFilterRowTitle>
          </DetailFilterRowHeader>
          <DetailFilterRowContent $justify>
            <Radio width="100%" height="2.5rem" name="sortType" label="기본순" />
            <Radio width="100%" height="2.5rem" name="sortType" label="추천순" />
            <Radio width="100%" height="2.5rem" name="sortType" label="A-Z순" />
            <Radio width="100%" height="2.5rem" name="sortType" label="티어순" />
          </DetailFilterRowContent>
        </DetailFilterRow>
        <DetailFilterRow>
          <DetailFilterRowHeader $direction="column">
            <DetailFilterRowTitle>듀오 가능 여부</DetailFilterRowTitle>
            <DetailFilterRowAddition>듀오 플레이가 가능한 티어인지 확인해 드려요!</DetailFilterRowAddition>
          </DetailFilterRowHeader>
          <DetailFilterRowContent>
            <DetailCheckBoxWrapper>
              <input type="checkbox" />
              <span>듀오 가능한 유저만 보기</span>
            </DetailCheckBoxWrapper>
          </DetailFilterRowContent>
        </DetailFilterRow>
        <DetailFilterRow>
          <DetailFilterRowHeader $direction="column">
            <DetailFilterRowTitle>게임 가능 시간</DetailFilterRowTitle>
            <DetailFilterRowAddition>자신이 설정해놓은 시간에 맞는 유저를 찾아드려요!</DetailFilterRowAddition>
          </DetailFilterRowHeader>
          <DetailFilterRowContent>
            <DetailCheckBoxWrapper>
              <input type="checkbox" />
              <span>게임 가능한 유저만 보기</span>
            </DetailCheckBoxWrapper>
          </DetailFilterRowContent>
        </DetailFilterRow>
      </Content>
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
