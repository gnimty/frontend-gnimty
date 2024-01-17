import dataDragonVersion from '../constants/dataDragonVersion';

export default function profileIconUrl(iconId: number): string {
  return `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/profileicon/${iconId}.png`;
}
