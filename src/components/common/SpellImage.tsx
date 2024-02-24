import Image from 'next/image';

import spellIdKrNameMap from '@/apis/constants/spellIdKrNameMap';
import spellIconUrl from '@/apis/utils/spellIconUrl';

import type { ImageProps } from 'next/image';

interface SpellImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  spellId: number;
}

export default function SpellImage(props: SpellImageProps) {
  const { spellId, ...restProps } = props;

  return <Image src={spellIconUrl(spellId)} alt={spellIdKrNameMap[spellId]} {...restProps} />;
}
