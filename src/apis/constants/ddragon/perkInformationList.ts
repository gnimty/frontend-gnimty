import axios from 'axios';

import dataDragonVersion from '../dataDragonVersion';

interface DdragonPerk {
  /** @example 8112 */
  id: number;
  /** @example "Electrocute" */
  key: string;
  /** @example "perk-images/Styles/Domination/Electrocute/Electrocute.png" */
  icon: string;
  /** @example "감전" */
  name: string;
}

interface DdragonPerkInformationSlot {
  runes: DdragonPerk[];
}

interface DdragonPerkInformation {
  /** @example 8100 */
  id: number;
  /** @example "Domination" */
  key: string;
  /** @example "perk-images/Styles/7200_Domination.png" */
  icon: string;
  /** @example "지배" */
  name: string;
  slots: DdragonPerkInformationSlot[];
}

const perkInformationList = (
  await axios<DdragonPerkInformation[]>(
    `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/data/ko_KR/runesReforged.json`,
  )
).data;

export default perkInformationList;
