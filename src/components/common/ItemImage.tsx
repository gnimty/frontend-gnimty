import Image from 'next/image';

import itemIdKrNameMap from '@/apis/constants/itemIdKrNameMap';
import itemIconUrl from '@/apis/utils/itemIconUrl';

import type { ImageProps } from 'next/image';

interface ItemImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  itemId: number;
  width: number;
  height: number;
}

export default function ItemImage(props: ItemImageProps) {
  const { itemId, ...restProps } = props;

  return <Image src={itemIconUrl(itemId)} alt={itemIdKrNameMap[itemId]} {...restProps} />;
}
