import { Box } from '@chakra-ui/react';
import Image from 'next/image';

import championIconUrl from '@/apis/utils/championIconUrl';

interface ChampionIconProps {
  championEnName: string;
  width: number;
  height: number;
  radius?: number;
}

export default function ChampionIcon({ championEnName, width, height, radius }: ChampionIconProps) {
  const capitalizedChampionEnName = championEnName.charAt(0).toUpperCase() + championEnName.slice(1);
  return (
    <Box
      w={`${width}px`}
      h={`${height}px`}
      borderRadius={radius}
      overflow="hidden"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        src={championIconUrl(capitalizedChampionEnName)}
        alt={championEnName}
        width={width}
        height={height}
        css={{
          transform: 'scale(1.2)',
        }}
      />
    </Box>
  );
}
