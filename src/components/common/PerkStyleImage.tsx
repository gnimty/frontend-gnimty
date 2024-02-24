import { colors } from '@/styles/theme/constants/colors';

import Domination from '../../assets/images/rune/domination.svg';
import Inspiration from '../../assets/images/rune/inspiration.svg';
import Precision from '../../assets/images/rune/precision.svg';
import Resolve from '../../assets/images/rune/resolve.svg';
import Sorcery from '../../assets/images/rune/sorcery.svg';

import type { ComponentPropsWithoutRef, FC } from 'react';

export const perkStyleIdColorMap: Record<number, string> = {
  8000: colors.yellow800,
  8100: colors.red700,
  8200: colors.purple700,
  8400: colors.green800,
  8300: colors.blue700,
};

const perkStyleIdImgMap: Record<number, FC<ComponentPropsWithoutRef<'svg'>>> = {
  8000: Precision,
  8100: Domination,
  8200: Sorcery,
  8400: Resolve,
  8300: Inspiration,
};

interface PerkStyleImageProps extends ComponentPropsWithoutRef<'svg'> {
  perkStyleId: number;
}

export default function PerkStyleImage(props: PerkStyleImageProps) {
  const { perkStyleId, ...restProps } = props;

  const SelectedPerkStyleImage = perkStyleIdImgMap[perkStyleId];

  return <SelectedPerkStyleImage {...restProps} />;
}
