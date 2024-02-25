import SelectButton from '@/components/common/select/SelectButton';
import SelectList from '@/components/common/select/SelectList';

import * as style from './Select.style';
import useSelect from './useSelect';

import type { SelectOption as TSelectOption } from './useSelect';
import type { ComponentPropsWithoutRef } from 'react';

interface SelectProps<T> extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  options: TSelectOption<T>[];
  onChange?: (value: T) => void;
  CustomSelectButton?: typeof SelectButton;
  CustomSelectList?: typeof SelectList;
}

/**
 * 항상 CSS를 통해 width를 사용하는 게 좋습니다.
 * 사용하지 않으면 선택된 옵션의 width에 따라 컴포넌트의 크기가 유동적으로 바뀌어
 * 사용자에게 나쁜 경험을 줍니다.
 */
export default function Select<T extends string>(props: SelectProps<T>) {
  const { options, onChange, CustomSelectButton, CustomSelectList, ...restProps } = props;

  const { isOpened, selectedValue, selectedOption, toggleDropdown, onOptionClick } = useSelect<T>({
    options,
    onChange,
  });

  const Button = CustomSelectButton ?? SelectButton;
  const List = CustomSelectList ?? SelectList;

  return (
    <div css={style.selectWrapper} {...restProps}>
      <Button isOpened={isOpened} toggleDropdown={toggleDropdown} selectedOption={selectedOption} />
      <List isOpened={isOpened} options={options} selectedValue={selectedValue} onOptionClick={onOptionClick} />
    </div>
  );
}
