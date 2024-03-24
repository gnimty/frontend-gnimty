import dataDragonVersion from '../constants/dataDragonVersion';

export default function skillIconUrl(skillId: string): string {
  return `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/spell/${skillId}.png`;
}
