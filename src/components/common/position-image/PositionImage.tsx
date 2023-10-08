import type { Position } from '@/api/types';
import type { IconProps } from '@/components/icons/types';

import Bottom from './Bottom';
import Jungle from './Jungle';
import Middle from './Middle';
import Top from './Top';
import Utility from './Utility';

import type { FC } from 'react';

const positionImages: Record<Position, FC<IconProps>> = {
  TOP: Top,
  JUNGLE: Jungle,
  MIDDLE: Middle,
  BOTTOM: Bottom,
  UTILITY: Utility,
};

const positionLabels: Record<Position, string> = {
  TOP: '탑',
  JUNGLE: '정글',
  MIDDLE: '미드',
  BOTTOM: '바텀',
  UTILITY: '서포터',
};

interface PositionImageProps extends IconProps {
  position: Position;
}

export default function PositionImage(props: PositionImageProps) {
  const { position, ...restProps } = props;

  const Icon = positionImages[position];
  return <Icon aria-label={positionLabels[position]} {...restProps} />;
}
