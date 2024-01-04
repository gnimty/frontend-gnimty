import dataDragonVersion from '../constants/dataDragonVersion';

export default function championIconUrl(championEnName: string): string {
  return `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/champion/${championEnName}.png`;
}
