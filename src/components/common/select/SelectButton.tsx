import Down from '@/assets/icons/system/down.svg';
import Up from '@/assets/icons/system/up.svg';
import * as style from '@/components/common/select/Select.style';
import SelectOption from '@/components/common/select/SelectOption';

import type { SelectOption as TSelectOption } from './useSelect';

export interface SelectButtonProps<T> {
  isOpened: boolean;
  toggleDropdown: () => void;
  selectedOption: TSelectOption<T>;
}

export default function SelectButton<T extends string>({
  toggleDropdown,
  selectedOption,
  isOpened,
}: SelectButtonProps<T>) {
  const Arrow = isOpened ? Up : Down;

  return (
    <button type="button" onClick={toggleDropdown} css={style.selectButton}>
      <SelectOption text={selectedOption.text} leftAsset={selectedOption.leftAsset} />
      <Arrow width="16" height="16" aria-hidden css={style.selectButtonArrow} />
    </button>
  );
}
