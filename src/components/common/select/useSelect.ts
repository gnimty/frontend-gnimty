import { useCallback, useState } from 'react';

import type { ReactNode } from 'react';

export interface SelectOption {
  value: string;
  text: string;
  leftAsset?: ReactNode;
}

export interface UseSelectOptions {
  options: SelectOption[];
  onChange?: (value: string) => void;
}

export default function useSelect(hookOptions: UseSelectOptions) {
  const { options, onChange } = hookOptions;

  const [selectedValue, setSelectedValue] = useState(options[0].value);
  const selectedOption = options.find((option) => option.value === selectedValue) ?? options[0];

  const [isOpened, setIsOpened] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpened((prev) => !prev);
  }, []);

  const onOptionClick = useCallback(
    (value: string) => {
      setSelectedValue(value);
      onChange?.(value);
      setIsOpened(false);
    },
    [onChange],
  );

  return { isOpened, selectedValue, selectedOption, toggleDropdown, onOptionClick };
}
