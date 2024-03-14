import { HStack } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';

import { type DuoSummonersRequest } from '@/apis/types';
import FilterSet from '@/assets/icons/system/filter-set.svg';
import FilterIcon from '@/assets/icons/system/filter.svg';
import ResetIcon from '@/assets/icons/system/reset.svg';
import PositionImage from '@/components/common/position-image/PositionImage';
import Unselected from '@/components/common/position-image/Unselected';
import Select from '@/components/common/select/Select';
import SpeechBubble from '@/components/common/SpeechBubble';
import StatusIndicator from '@/components/common/StatusIndicator';
import TierImage from '@/components/common/TierImage';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import { defaultDuoSummonersRequest } from '@/pages/duo';

import type { UseDisclosureReturn } from '@chakra-ui/react';

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
  requestParams: DuoSummonersRequest;
  updateParams: (toUpdate: Record<string, DuoSummonersRequest[keyof DuoSummonersRequest]>) => void;
}

const Filter = ({ disclosure, allOpen, toggleAll, requestParams, updateParams }: FilterProps) => {
  const theme = useTheme();
  const { isOpen, onToggle } = disclosure;
  // lanes
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
      if (position && position !== 'ALL') {
        setSelected((prev) => {
          if (prev.includes(position)) {
            return prev.filter((p) => p !== position);
          }
          return [...prev, position];
        });
      }
      if (position === 'ALL') {
        setSelected([]);
      }
    }
  };

  const resetFilter = () => {
    setSelected([]);
    updateParams({ ...defaultDuoSummonersRequest });
  };

  useEffect(() => {
    updateParams({ lanes: selected.join(',') });
  }, [selected, updateParams]);

  return (
    <HStack w="full" justify="space-between">
      <HStack w="max-content" spacing="8px">
        <Select
          options={[
            { text: '솔로 랭크', value: 'RANK_SOLO' },
            { text: '자유 랭크', value: 'RANK_FLEX' },
            { text: '일반/칼바람', value: 'BLIND' },
          ]}
          externalValue={requestParams.gameMode}
          onChange={(v) => updateParams({ gameMode: v })}
          css={{ width: '124px' }}
        />
        <Select
          options={[
            { text: '온라인', value: 'ONLINE', leftAsset: <StatusIndicator status="ONLINE" /> },
            { text: '오프라인', value: 'OFFLINE', leftAsset: <StatusIndicator status="OFFLINE" /> },
            { text: '자리비움', value: 'AWAY', leftAsset: <StatusIndicator status="AWAY" /> },
          ]}
          externalValue={requestParams.status}
          onChange={(v) => updateParams({ status: v })}
          css={{ width: '124px' }}
        />
        <Select
          options={[
            { text: '언랭크 이상', value: 'unknown', leftAsset: <TierImage tier="unknown" fill sizes="20px" /> },
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
          externalValue={requestParams.tier}
          onChange={(v) => updateParams({ tier: v })}
          css={{ width: '148px' }}
        />
        <FilterIconBox onClick={handlePositionSelect} ref={ulRef}>
          <FilterIconItem data-position="ALL" selected={selected.length === 0}>
            <Unselected fill={selected.length === 0 ? theme.colors.white : undefined} />
          </FilterIconItem>
          <FilterIconItem data-position="TOP" selected={selected.includes('TOP')}>
            <PositionImage position="TOP" fill={selected.includes('TOP') ? theme.colors.white : undefined} />
          </FilterIconItem>
          <FilterIconItem data-position="JUNGLE" selected={selected.includes('JUNGLE')}>
            <PositionImage position="JUNGLE" fill={selected.includes('JUNGLE') ? theme.colors.white : undefined} />
          </FilterIconItem>
          <FilterIconItem data-position="MIDDLE" selected={selected.includes('MIDDLE')}>
            <PositionImage position="MIDDLE" fill={selected.includes('MIDDLE') ? theme.colors.white : undefined} />
          </FilterIconItem>
          <FilterIconItem data-position="BOTTOM" selected={selected.includes('BOTTOM')}>
            <PositionImage position="BOTTOM" fill={selected.includes('BOTTOM') ? theme.colors.white : undefined} />
          </FilterIconItem>
          <FilterIconItem data-position="UTILITY" selected={selected.includes('UTILITY')}>
            <PositionImage position="UTILITY" fill={selected.includes('UTILITY') ? theme.colors.white : undefined} />
          </FilterIconItem>
        </FilterIconBox>

        <FilterDetailButton
          $open={isOpen}
          onClick={onToggle}
          onMouseEnter={() => setShowSpeechBubble(true)}
          onMouseLeave={() => setShowSpeechBubble(false)}
          css={{
            backgroundColor: selected.length > 0 && !isOpen ? theme.colors.main : theme.colors.white,
          }}
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
                color: theme.colors.main,
              }}
            />
          ) : selected.length > 0 ? (
            <FilterSet
              width="24px"
              height="24px"
              css={{
                backgroundColor: theme.colors.main,
                color: theme.colors.gray200,
              }}
            />
          ) : (
            <FilterIcon
              width="24px"
              height="24px"
              css={{
                color: theme.colors.gray800,
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
        <ResetWrapper onClick={resetFilter}>
          <ResetIcon width="24px" height="24px" />
        </ResetWrapper>
      </HStack>
    </HStack>
  );
};

export default Filter;
