import Image from 'next/image';
import styled from 'styled-components';

import CheckIcon from '@/assets/icons/system/check.svg';
import { type ChampionName } from '@/constants/champions';
import { getChampionSprite } from '@/utils/championSprite';

const Container = styled.div`
  width: 2.5rem;
  height: 3.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ChampionImageWrapper = styled.div<{ selected: boolean }>`
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  span,
  img {
    z-index: 1;
    border-radius: 50%;
  }
  span::after {
    content: '';
    width: 100%;
    height: 100%;
    z-index: 2;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${({ selected }) => (selected ? '#DE2E3966' : 'transparent')};
  }
`;

const ChampionName = styled.span`
  width: 2.5rem;
  height: 1rem;
  font-size: ${({ theme }) => theme.fonts.body.fontSize};
  line-height: ${({ theme }) => theme.fonts.body.lineHeight};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray700};
  text-align: left;
  text-overflow: ellipsis;
`;

const SelectedChecker = styled.div<{ selected: boolean }>`
  width: 1rem;
  height: 1rem;
  display: ${({ selected }) => (selected ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  right: 0;
  background-color: #de2e39;
  z-index: 3;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ChampionProps {
  championName: ChampionName;
  selected?: boolean;
  onClick: (championName: ChampionName) => void;
}

const Champion = ({ championName, selected = false, onClick }: ChampionProps) => {
  const sprite = getChampionSprite(championName);
  return (
    <Container onClick={() => onClick(championName)}>
      <ChampionImageWrapper selected={selected}>
        {selected && (
          <SelectedChecker selected={selected}>
            <CheckIcon fill="#fff" width="70%" />
          </SelectedChecker>
        )}
        <Image src={sprite} alt={championName} width="2.5rem" height="2.5rem" layout="responsive" />
      </ChampionImageWrapper>
      <ChampionName>{championName}</ChampionName>
    </Container>
  );
};

export default Champion;
