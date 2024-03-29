import axios from 'axios';

import dataDragonVersion from '../dataDragonVersion';

interface DdragonChampion {
  /** @example "TwistedFate" */
  id: string;
  /** @example "4" */
  key: string;
  /** @example "트위스티드 페이트" */
  name: string;
}

interface DdragonChampionsResponse {
  data: Record<string, DdragonChampion>;
}
const champions = (
  await axios<DdragonChampionsResponse>(
    `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/data/ko_KR/champion.json`,
  )
).data.data;

export default champions;
