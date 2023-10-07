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
        <div css={style.selectButtonContent}>
          {selectedOption.leftAsset !== undefined ? <div css={style.leftAsset}>{selectedOption.leftAsset}</div> : null}
          <div css={style.selectButtonText}>{selectedOption?.text}</div>
        </div>
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
            css={style.option({ isSelected: option.value === selectedValue })}
          >
            {option.leftAsset !== undefined ? <span css={style.leftAsset}>{option.leftAsset}</span> : null}
            <span css={style.selectButtonText}>{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
