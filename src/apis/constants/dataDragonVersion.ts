import axios from 'axios';

import { getReleaseInformation } from '../queries/releaseInformationQuery';

// 이 모듈은 빌드 타임(top-level await)에 평가되므로, 백엔드 API에 접근할 수 없으면
// 빌드 전체가 실패한다. 백엔드가 응답하지 않을 때를 대비해 단계적으로 폴백한다.
// 1) 백엔드(/asset/version) → 2) Riot Data Dragon 공개 버전 목록 → 3) 하드코딩 버전
const FALLBACK_DDRAGON_VERSION = '15.11.1';

async function resolveDataDragonVersion(): Promise<string> {
  try {
    const releaseInformation = await getReleaseInformation();
    return releaseInformation.data.version;
  } catch {
    try {
      const { data } = await axios.get<string[]>('https://ddragon.leagueoflegends.com/api/versions.json');
      return data[0] ?? FALLBACK_DDRAGON_VERSION;
    } catch {
      return FALLBACK_DDRAGON_VERSION;
    }
  }
}

const dataDragonVersion = await resolveDataDragonVersion();

export default dataDragonVersion;
