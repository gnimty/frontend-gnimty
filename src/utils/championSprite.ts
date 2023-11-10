import { champions, type ChampionName } from '@/constants/champions';

export const getChampionSprite = (championName: ChampionName) => {
  const englishName = champions[championName];
  return `https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${englishName}.png`;
};
