import axios from 'axios';

import dataDragonVersion from '../dataDragonVersion';

interface Item {
  name: string;
}

interface DdragonItemResponse {
  data: Record<string, Item>;
}

const items = (
  await axios<DdragonItemResponse>(`https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/data/ko_KR/item.json`)
).data.data;

export default items;
