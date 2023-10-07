import { useCallback, useState } from 'react';

import type { ReactNode } from 'react';

export interface SelectOption {
  value: string;
  text: string;
  leftAsset?: ReactNode;
}

export default function useSelect(options: SelectOption[]) {
  const [selectedValue, setSelectedValue] = useState(options[0].value);
  const selectedOption = options.find((option) => option.value === selectedValue) ?? options[0];

  const [isOpened, setIsOpened] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpened((prev) => !prev);
  }, []);

  const onOptionClick = useCallback((value: string) => {
    setSelectedValue(value);
    setIsOpened(false);
  }, []);

  return { isOpened, selectedValue, selectedOption, toggleDropdown, onOptionClick };
}
