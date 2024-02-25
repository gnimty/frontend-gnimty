import * as style from '@/components/common/select/Select.style';
import SelectOption from '@/components/common/select/SelectOption';
import type { SelectOption as TSelectOption } from '@/components/common/select/useSelect';

import type { ComponentPropsWithoutRef } from 'react';

export interface SelectListProps<T> extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  isOpened: boolean;
  options: TSelectOption<T>[];
  onChange?: (value: T) => void;
  selectedValue: T;
  onOptionClick: (value: T) => void;
}

export default function SelectList<T extends string>({
  options,
  selectedValue,
  onOptionClick,
  isOpened,
}: SelectListProps<T>) {
  return (
    <div css={style.options({ isOpened: isOpened })}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => {
            onOptionClick(option.value);
          }}
          css={style.optionButton({ isSelected: option.value === selectedValue })}
        >
          <SelectOption text={option.text} leftAsset={option.leftAsset} />
        </button>
      ))}
    </div>
  );
}
