import ddragonChampions from './ddragon/champions';

import type { ChampionDto } from '../types';

const champions: ChampionDto[] = Object.values(ddragonChampions).map((champion) => ({
  championId: parseInt(champion.key, 10),
  krName: champion.name,
  enName: champion.id,
}));

export default champions;
