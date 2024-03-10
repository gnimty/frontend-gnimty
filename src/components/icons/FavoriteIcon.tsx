import FavoriteOffIcon from '@/assets/icons/system/favorite-off.svg';
import FavoriteOnIcon from '@/assets/icons/system/favorite-on.svg';

import type { ComponentPropsWithoutRef } from 'react';

interface FavoriteIconProps extends ComponentPropsWithoutRef<'svg'> {
  isOn: boolean;
}

export default function FavoriteIcon(props: FavoriteIconProps) {
  const { isOn, ...restProps } = props;

  return isOn ? <FavoriteOnIcon color="#de2e39" {...restProps} /> : <FavoriteOffIcon color="#111" {...restProps} />;
}
