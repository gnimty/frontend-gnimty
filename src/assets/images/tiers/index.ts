import type { Tier } from '@/api/types';

import bronze from './bronze.png';
import challenger from './challenger.png';
import diamond from './diamond.png';
import emerald from './emerald.png';
import gold from './gold.png';
import grandmaster from './grandmaster.png';
import iron from './iron.png';
import master from './master.png';
import platinum from './platinum.png';
import silver from './silver.png';
import UNRANKED from './UNRANKED.png';

import type { StaticImageData } from 'next/image';

const tiers: Record<Tier, StaticImageData> = {
  UNRANKED,
  bronze,
  iron,
  silver,
  gold,
  platinum,
  emerald,
  diamond,
  master,
  grandmaster,
  challenger,
};

export default tiers;
