import { useState, type MouseEvent } from 'react';
import { styled } from 'styled-components';

import ToggleSwitch from '@/components/common/ToggleSwitch';

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
  color: ${({ theme, selected }) => (selected ? theme.colors.white : theme.colors.gray700)};
  background-color: ${({ theme, selected }) => (selected ? theme.colors.red800 : theme.colors.white)};
`;

const FilterDetailButton = styled.button`
  width: 40px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
`;

const ResetButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: 'B';
  }
`;

interface FilterProps {
  allOpen: boolean;
  toggleAll: () => void;
}

function Filter({ allOpen, toggleAll }: FilterProps) {
  const filterItems = ['A', 'T', 'J', 'M', 'B', 'S'];
  const [selected, setSelected] = useState('A');
  const handlePositionSelect = (e: MouseEvent<HTMLUListElement>) => {
    const { target } = e;
    if (target instanceof HTMLLIElement) {
      setSelected(target.innerText);
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
        <FilterIconBox onClick={handlePositionSelect}>
          {filterItems.map((filterItem) => {
            if (filterItem === selected) {
              return (
                <FilterIconItem key={filterItem} selected={true}>
                  {filterItem}
                </FilterIconItem>
              );
            }
            return <FilterIconItem key={filterItem}>{filterItem}</FilterIconItem>;
          })}
        </FilterIconBox>

        <FilterDetailButton>O</FilterDetailButton>
      </FilterLeft>
      <FilterRight>
        <ToggleSwitch onOff={allOpen} onClick={toggleAll} label="펼쳐보기" />
        <ResetButton />
      </FilterRight>
    </FilterWrapper>
  );
}

export default Filter;
