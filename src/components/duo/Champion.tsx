import styled from '@emotion/styled';
import Image from 'next/image';

import championIconUrl from '@/apis/utils/championIconUrl';
import CheckIcon from '@/assets/icons/system/check.svg';

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
  &::after {
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
  width: 40px;
  height: 16px;
  font-size: ${({ theme }) => theme.fonts.body.fontSize};
  line-height: ${({ theme }) => theme.fonts.body.lineHeight};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray700};
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
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
  championKrName: string; // championKrName
  championEnName: string; // championEnName
  selected?: boolean;
  onClick: (championName: string) => void;
}

const Champion = ({ championKrName, championEnName, selected = false, onClick }: ChampionProps) => {
  return (
    <Container onClick={() => onClick(championEnName)}>
      <ChampionImageWrapper selected={selected}>
        {selected && (
          <SelectedChecker selected={selected}>
            <CheckIcon fill="#fff" width="70%" />
          </SelectedChecker>
        )}
        <Image src={championIconUrl(championEnName)} alt={championEnName} width={40} height={40} />
      </ChampionImageWrapper>
      <ChampionName>{championKrName}</ChampionName>
    </Container>
  );
};

export default Champion;
