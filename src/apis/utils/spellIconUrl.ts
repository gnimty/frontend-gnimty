import dataDragonVersion from '../constants/dataDragonVersion';
import spellIdImgNameMap from '../constants/spellIdImgNameMap';

export default function spellIconUrl(spellId: number): string {
  return `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/spell/${spellIdImgNameMap[spellId]}.png`;
}
