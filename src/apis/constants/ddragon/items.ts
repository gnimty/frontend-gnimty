import axios from 'axios';

import dataDragonVersion from '../dataDragonVersion';

/**
 * @example "1001": {
 *      "name": "신발"
 *      "image": {
 *          "full": "1001.png",
 *      }
 *      "plaintext": "이동 속도가 약간 증가합니다."
 * }
 */
interface Item {
  name: string;
  image: {
    full: string;
  };
  plaintext: string;
}

interface DdragonItemResponse {
  data: Record<string, Item>;
}

const items = (
  await axios<DdragonItemResponse>(`https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/data/ko_KR/item.json`)
).data.data;

export default items;
