import Down from '@/components/icons/Down';
import Up from '@/components/icons/Up';

import * as style from './Select.style';
import useSelect from './useSelect';

import type { ComponentPropsWithoutRef } from 'react';
import type { SelectOption } from './useSelect';

interface OptionProps extends Pick<SelectOption, 'text' | 'leftAsset'>, ComponentPropsWithoutRef<'div'> {}

function Option(props: OptionProps) {
  const { text, leftAsset, ...restProps } = props;
  return (
    <div css={style.optionContent} {...restProps}>
      {leftAsset !== undefined ? <div css={style.optionLeftAsset}>{leftAsset}</div> : null}
      <div css={style.optionText}>{text}</div>
    </div>
  );
}

interface SelectProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  options: SelectOption[];
  onChange?: (value: string) => void;
}

/**
 * 항상 CSS를 통해 width를 사용하는 게 좋습니다.
 * 사용하지 않으면 선택된 옵션의 width에 따라 컴포넌트의 크기가 유동적으로 바뀌어
 * 사용자에게 나쁜 경험을 줍니다.
 */
export default function Select(props: SelectProps) {
  const { options, onChange, ...restProps } = props;

  const { isOpened, selectedValue, selectedOption, toggleDropdown, onOptionClick } = useSelect({
    options,
    onChange,
  });

  const Arrow = isOpened ? Up : Down;

  return (
    <div css={style.selectWrapper} {...restProps}>
      <button type="button" onClick={toggleDropdown} css={style.selectButton}>
        <Option text={selectedOption.text} leftAsset={selectedOption.leftAsset} />
        <Arrow width="16" height="16" aria-hidden css={style.selectButtonArrow} />
      </button>

      <div css={style.options({ isOpened })}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              onOptionClick(option.value);
            }}
            css={style.optionButton({ isSelected: option.value === selectedValue })}
          >
            <Option text={option.text} leftAsset={option.leftAsset} />
          </button>
        ))}
      </div>
    </div>
  );
}
