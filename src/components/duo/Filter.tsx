import styled from '@emotion/styled';
import { useState, type MouseEvent, useRef } from 'react';

import Bot from '@/assets/icons/game/position/bot.svg';
import Every from '@/assets/icons/game/position/every.svg';
import Jug from '@/assets/icons/game/position/jug.svg';
import Mid from '@/assets/icons/game/position/mid.svg';
import Sup from '@/assets/icons/game/position/sup.svg';
import Top from '@/assets/icons/game/position/top.svg';
import FilterSet from '@/assets/icons/system/filter-set.svg';
import FilterIcon from '@/assets/icons/system/filter.svg';
import ResetIcon from '@/assets/icons/system/reset.svg';
import SpeechBubble from '@/components/common/SpeechBubble';
import ToggleSwitch from '@/components/common/ToggleSwitch';

import Unselected from '../common/position-image/Unselected';

const FilterWrapper = styled.div`
  width: 67.5rem;
  margin: 0 auto;
  height: 2.5rem;
  display: flex;
  justify-content: space-between;
`;

const FilterBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FilterLeft = styled(FilterBox)`
  width: 701px;
`;

const FilterRight = styled(FilterBox)`
  width: 141px;
  svg {
    cursor: pointer;
  }
`;

const ResetWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// TODO: Dropdown Component로 교체
const Dropdown = styled.select`
  min-width: max-content;
  width: 7.2rem;
  min-height: 2.5rem;
  padding: 10px 10px 10px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
`;

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
  height: 100%;
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
  height: 100%;
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

interface FilterProps {
  allOpen: boolean;
  toggleAll: () => void;
  detailOpen: boolean;
  toggleDetail: () => void;
}

function Filter({ allOpen, toggleAll, detailOpen, toggleDetail }: FilterProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const ulRef = useRef<HTMLUListElement>(null);
  const handlePositionSelect = (e: MouseEvent<HTMLUListElement>) => {
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
    <FilterWrapper>
      <FilterLeft>
        <Dropdown>
          <option value="aram">칼바람 나락</option>
        </Dropdown>
        <Dropdown>
          <option value="online">온라인</option>
        </Dropdown>
        <Dropdown>
          <option value="all">티어 전체</option>
        </Dropdown>
        <FilterIconBox onClick={handlePositionSelect} ref={ulRef}>
          <FilterIconItem data-position="every" selected={selected.includes('every')}>
            <Every />
          </FilterIconItem>
          <FilterIconItem data-position="top" selected={selected.includes('top')}>
            <Top />
          </FilterIconItem>
          <FilterIconItem data-position="jug" selected={selected.includes('jug')}>
            <Jug />
          </FilterIconItem>
          <FilterIconItem data-position="mid" selected={selected.includes('mid')}>
            <Mid />
          </FilterIconItem>
          <FilterIconItem data-position="bot" selected={selected.includes('bot')}>
            <Bot />
          </FilterIconItem>
          <FilterIconItem data-position="sup" selected={selected.includes('sup')}>
            <Sup />
          </FilterIconItem>
        </FilterIconBox>

        <FilterDetailButton
          $open={detailOpen}
          onClick={toggleDetail}
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
          {detailOpen ? (
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
      </FilterLeft>
      <FilterRight>
        <ToggleSwitch onOff={allOpen} onClick={toggleAll} label="펼쳐보기" />
        <ResetWrapper>
          <ResetIcon width="24px" height="24px" />
        </ResetWrapper>
      </FilterRight>
    </FilterWrapper>
  );
}

export default Filter;
