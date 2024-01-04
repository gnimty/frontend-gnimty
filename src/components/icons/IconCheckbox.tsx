import type { ElementType } from 'react';

interface IconCheckboxProps {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  as: ElementType;
}

export default function IconCheckbox({ isChecked, isIndeterminate, as: Element, ...rest }: IconCheckboxProps) {
  return <Element {...rest} />;
}
