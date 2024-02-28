import * as style from '@/components/common/select/Select.style';

import type { SelectOption as TSelectOption } from './useSelect';
import type { ComponentPropsWithoutRef } from 'react';

interface SelectOptionProps<T> extends Pick<TSelectOption<T>, 'text' | 'leftAsset'>, ComponentPropsWithoutRef<'div'> {}

function SelectOption<T>(props: SelectOptionProps<T>) {
  const { text, leftAsset, ...restProps } = props;
  return (
    <div css={style.optionContent} {...restProps}>
      {leftAsset !== undefined ? <div css={style.optionLeftAsset}>{leftAsset}</div> : null}
      <div css={style.optionText}>{text}</div>
    </div>
  );
}

export default SelectOption;
