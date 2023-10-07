import { useState } from 'react';

import Down from '@/components/icons/Down';
import Up from '@/components/icons/Up';

import * as style from './Select.style';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface SelectOption {
  value: string;
  text: string;
  leftAsset?: ReactNode;
}

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

interface SelectProps extends ComponentPropsWithoutRef<'div'> {
  width: string;
  options: SelectOption[];
}

export default function Select(props: SelectProps) {
  const { options, width, ...restProps } = props;

  const [selectedValue, setSelectedValue] = useState(options[0].value);
  const selectedOption = options.find((option) => option.value === selectedValue) ?? options[0];

  const [isOpened, setIsOpened] = useState(false);

  function handleButtonClick() {
    setIsOpened((prev) => !prev);
  }

  function handleOptionClick(value: string) {
    setSelectedValue(value);
    setIsOpened(false);
  }

  const Arrow = isOpened ? Up : Down;

  return (
    <div css={style.selectWrapper({ width })} {...restProps}>
      <button type="button" onClick={handleButtonClick} css={style.selectButton}>
        <Option text={selectedOption.text} leftAsset={selectedOption.leftAsset} />
        <Arrow width="16" height="16" aria-hidden css={style.selectButtonArrow} />
      </button>

      <div css={style.options({ isOpened })}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              handleOptionClick(option.value);
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
