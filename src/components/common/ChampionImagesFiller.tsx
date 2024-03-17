import { Circle, HStack, type StackProps } from '@chakra-ui/react';
import Image from 'next/image';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import championIdKrNameMap from '@/apis/constants/championIdKrNameMap';
import championIconUrl from '@/apis/utils/championIconUrl';

const FILL_COUNT_MAX = 3;

interface ChampionImagesFillerProps extends StackProps {
  championIds: number[];
  imagesSizePx: number;
}

export default function ChampionImagesFiller(props: ChampionImagesFillerProps) {
  const { championIds, imagesSizePx, ...restProps } = props;
  const emptyCount = FILL_COUNT_MAX - championIds.length;

  if (emptyCount < 0) {
    throw new Error('<ChampionImagesFiller>의 최댓값 보다 championIds의 배열의 길이가 더 깁니다.');
  }

  return (
    <HStack {...restProps}>
      {[...championIds, ...(Array(emptyCount).fill(undefined) as undefined[])].map((championId, i) =>
        championId !== undefined ? (
          <Image
            key={championId}
            src={championIconUrl(championIdEnNameMap[championId])}
            alt={championIdKrNameMap[championId]}
            width={imagesSizePx}
            height={imagesSizePx}
            css={{ borderRadius: '999px' }}
          />
        ) : (
          <Circle key={`empty${i}`} bg="gray200" size={`${imagesSizePx}px`} />
        ),
      )}
    </HStack>
  );
}
