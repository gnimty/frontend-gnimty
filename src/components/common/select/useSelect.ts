import { useCallback, useEffect, useState } from 'react';

import type { ReactNode } from 'react';

export interface SelectOption<T> {
  value: T;
  text: string;
  leftAsset?: ReactNode;
}

export interface UseSelectOptions<T> {
  options: SelectOption<T>[];
  externalValue?: T;
  onChange?: (value: T) => void;
}

export default function useSelect<T>(hookOptions: UseSelectOptions<T>) {
  const { options, externalValue, onChange } = hookOptions;

  const [selectedValue, setSelectedValue] = useState<T>(externalValue ?? options[0].value);
  const selectedOption = options.find((option) => option.value === selectedValue) ?? options[0];

  const [isOpened, setIsOpened] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpened((prev) => !prev);
  }, []);

  const onOptionClick = useCallback(
    (value: T) => {
      setSelectedValue(value);
      onChange?.(value);
      setIsOpened(false);
    },
    [onChange],
  );

  useEffect(() => {
    if (externalValue !== undefined && externalValue !== selectedValue) {
      setSelectedValue(externalValue);
    }
  }, [externalValue, selectedValue]);

  return { isOpened, selectedValue, selectedOption, toggleDropdown, onOptionClick };
}
