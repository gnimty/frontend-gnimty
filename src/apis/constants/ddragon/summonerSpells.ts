import axios from 'axios';

import dataDragonVersion from '../dataDragonVersion';

interface SummonerSpell {
  /** @example "SummonerBarrier" */
  id: string;
  /** @example "21" */
  key: string;
  /** @example "방어막" */
  name: string;
}

interface DdragonSummonerSpellsResponse {
  data: Record<string, SummonerSpell>;
}

const summonerSpells = (
  await axios<DdragonSummonerSpellsResponse>(
    `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/data/ko_KR/summoner.json`,
  )
).data.data;

export default summonerSpells;
