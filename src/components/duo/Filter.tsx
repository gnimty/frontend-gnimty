import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { HStack, UseDisclosureReturn } from '@chakra-ui/react';

import FilterSet from '@/assets/icons/system/filter-set.svg';
import FilterIcon from '@/assets/icons/system/filter.svg';
import ResetIcon from '@/assets/icons/system/reset.svg';
import Select from '@/components/common/select/Select';
import StatusIndicator from '@/components/common/StatusIndicator';
import TierImage from '@/components/common/TierImage';
import Unselected from '@/components/common/position-image/Unselected';
import PositionImage from '@/components/common/position-image/PositionImage';
import SpeechBubble from '@/components/common/SpeechBubble';
import ToggleSwitch from '@/components/common/ToggleSwitch';

const FilterIconBox = styled.ul`
  width: 240px;
  height: 100%;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  display: flex;
  align-items: center;
`;

const FilterIconItem = styled.li<{ selected?: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid ${({ theme }) => theme.colors.gray200};
  &:first-of-type {
    border-left: none;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }
  &:last-of-type {
    border-right: none;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
  }
  background-color: ${({ theme, selected }) => (selected ? theme.colors.red800 : theme.colors.white)};
  svg {
    width: 20px;
    height: 20px;
    path[class$='color1'] {
      fill: ${({ theme, selected }) => (selected ? theme.colors.white : theme.colors.gray500)};
    }
    path[class$='color2'] {
      fill: ${({ theme, selected }) => (selected ? theme.colors.white : theme.colors.gray800)};
    }
  }
`;

const FilterDetailButton = styled.button<{ $open: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  .speech-bubble {
    position: absolute;
    top: -50px;
  }
`;

const SpeechBubbleContent = styled.div`
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.body.fontSize};
  line-height: ${({ theme }) => theme.fonts.body.lineHeight};
  font-weight: 400;
  .bold {
    font-weight: 700;
  }
`;

const ResetWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface FilterProps {
  disclosure: UseDisclosureReturn;
  allOpen: boolean;
  toggleAll: () => void;
}

const Filter = ({ disclosure, allOpen, toggleAll }: FilterProps) => {
  const { isOpen, onToggle } = disclosure;
  const [selected, setSelected] = useState<string[]>([]);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const ulRef = useRef<HTMLUListElement>(null);
  const handlePositionSelect = (e: React.MouseEvent<HTMLUListElement>) => {
    let target = e.target as HTMLElement;
    while (target && !(target instanceof HTMLLIElement)) {
      if (target.parentElement) {
        target = target.parentElement;
      }
    }
    if (target instanceof HTMLLIElement) {
      const { position } = target.dataset;
      if (position) {
        setSelected((prev) => {
          if (prev.includes(position)) {
            return prev.filter((p) => p !== position);
          }
          return [...prev, position];
        });
      }
    }
  };
  return (
    <HStack w="full" justify="space-between">
      <HStack w="max-content" spacing="8px">
        <Select
          options={[
            { text: '솔로 랭크', value: 'soloRank' },
            { text: '자유 랭크', value: 'freeRank' },
            { text: '칼바람 나락', value: 'bridge' },
          ]}
          css={{ width: '124px' }}
        />
        <Select
          options={[
            { text: '온라인', value: 'online', leftAsset: <StatusIndicator status="ONLINE" /> },
            { text: '오프라인', value: 'offline', leftAsset: <StatusIndicator status="OFFLINE" /> },
            { text: '자리비움', value: 'away', leftAsset: <StatusIndicator status="AWAY" /> },
          ]}
          css={{ width: '124px' }}
        />
        <Select
          options={[
            { text: '언랭크 이상', value: 'unranked', leftAsset: <TierImage tier="UNRANKED" fill sizes="20px" /> },
            { text: '아이언 이상', value: 'iron', leftAsset: <TierImage tier="iron" fill sizes="20px" /> },
            { text: '브론즈 이상', value: 'bronze', leftAsset: <TierImage tier="bronze" fill sizes="20px" /> },
            { text: '실버 이상', value: 'silver', leftAsset: <TierImage tier="silver" fill sizes="20px" /> },
            { text: '골드 이상', value: 'gold', leftAsset: <TierImage tier="gold" fill sizes="20px" /> },
            {
              text: '플래티넘 이상',
              value: 'platinum',
              leftAsset: <TierImage tier="platinum" fill sizes="20px" />,
            },
            { text: '에메랄드 이상', value: 'emerald', leftAsset: <TierImage tier="emerald" fill sizes="20px" /> },
            {
              text: '다이아 이상',
              value: 'diamond',
              leftAsset: <TierImage tier="diamond" fill sizes="20px" />,
            },
            { text: '마스터 이상', value: 'master', leftAsset: <TierImage tier="master" fill sizes="20px" /> },
            {
              text: '그마 이상',
              value: 'grandmaster',
              leftAsset: <TierImage tier="grandmaster" fill sizes="20px" />,
            },
            {
              text: '챌린저 이상',
              value: 'challenger',
              leftAsset: <TierImage tier="challenger" fill sizes="20px" />,
            },
          ]}
          css={{ width: '148px' }}
        />
        <FilterIconBox onClick={handlePositionSelect} ref={ulRef}>
          <FilterIconItem data-position="every" selected={selected.includes('every')}>
            <Unselected fill={selected.includes('every') ? '#fff' : undefined} />
          </FilterIconItem>
          <FilterIconItem data-position="top" selected={selected.includes('top')}>
            <PositionImage position="TOP" fill={selected.includes('top') ? '#fff' : undefined} />
          </FilterIconItem>
          <FilterIconItem data-position="jug" selected={selected.includes('jug')}>
            <PositionImage position="JUNGLE" fill={selected.includes('jug') ? '#fff' : undefined} />
          </FilterIconItem>
          <FilterIconItem data-position="mid" selected={selected.includes('mid')}>
            <PositionImage position="MIDDLE" fill={selected.includes('mid') ? '#fff' : undefined} />
          </FilterIconItem>
          <FilterIconItem data-position="bot" selected={selected.includes('bot')}>
            <PositionImage position="BOTTOM" fill={selected.includes('bot') ? '#fff' : undefined} />
          </FilterIconItem>
          <FilterIconItem data-position="sup" selected={selected.includes('sup')}>
            <PositionImage position="UTILITY" fill={selected.includes('sup') ? '#fff' : undefined} />
          </FilterIconItem>
        </FilterIconBox>

        <FilterDetailButton
          $open={isOpen}
          onClick={onToggle}
          onMouseEnter={() => setShowSpeechBubble(true)}
          onMouseLeave={() => setShowSpeechBubble(false)}
        >
          <SpeechBubble width="150px" height="48px" show={showSpeechBubble}>
            <SpeechBubbleContent>
              <div>더욱 자세히 검색하고 싶다면</div>
              <div>
                <span className="bold">상세 필터</span>를 설정해 보세요.
              </div>
            </SpeechBubbleContent>
          </SpeechBubble>
          {isOpen ? (
            <FilterSet
              width="24px"
              height="24px"
              css={{
                color: '#DE2E39',
              }}
            />
          ) : (
            <FilterIcon
              width="24px"
              height="24px"
              css={{
                color: '#111111',
              }}
            />
          )}
        </FilterDetailButton>
      </HStack>

      <HStack
        w="141px"
        css={{
          svg: {
            cursor: 'pointer',
          },
        }}
      >
        <ToggleSwitch onOff={allOpen} onClick={toggleAll} label="펼쳐보기" />
        <ResetWrapper>
          <ResetIcon width="24px" height="24px" />
        </ResetWrapper>
      </HStack>
    </HStack>
  );
};

export default Filter;
