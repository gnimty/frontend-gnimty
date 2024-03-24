import dataDragonVersion from '../constants/dataDragonVersion';

export default function itemIconUrl(itemId: number): string {
  return `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/item/${itemId}.png`;
}
