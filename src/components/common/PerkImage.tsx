import Image from 'next/image';

import perkIdImgLinkMap from '@/apis/constants/perkIdImgLinkMap';
import perkIdKrNameMap from '@/apis/constants/perkIdKrNameMap';

import type { ImageProps } from 'next/image';

interface PerkImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  perkId: number;
}

export default function PerkImage(props: PerkImageProps) {
  const { perkId, ...restProps } = props;

  return (
    <Image
      src={`https://ddragon.leagueoflegends.com/cdn/img/${perkIdImgLinkMap[perkId]}`}
      alt={perkIdKrNameMap[perkId]}
      {...restProps}
    />
  );
}
