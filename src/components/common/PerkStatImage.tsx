import Image from 'next/image';

import perkStatIdImgLinkMap from '@/apis/constants/perkStatImgLinkMap';
import perkStatKrNameMap from '@/apis/constants/perkStatKrNameMap';

import type { ImageProps } from 'next/image';

interface PerkStatImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  perkStatId: number;
}

export default function PerkStatImage(props: PerkStatImageProps) {
  const { perkStatId, ...restProps } = props;

  return (
    <Image
      src={`https://ddragon.leagueoflegends.com/cdn/img/${perkStatIdImgLinkMap[perkStatId]}`}
      alt={perkStatKrNameMap[perkStatId]}
      {...restProps}
    />
  );
}
