import champions from '@/apis/constants/champions';
import dataDragonVersion from '@/apis/constants/dataDragonVersion';

export const getChampionSprite = (championName: string) => {
  const englishName = champions.find((champion) => champion.krName === championName)?.enName;
  return `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/champion/${englishName}.png`;
};
