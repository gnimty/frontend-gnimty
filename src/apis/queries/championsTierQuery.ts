import { queryOptions } from '@tanstack/react-query';

import request from '../httpRequest';

import type { ChampionTierDto, Position, PositionFilter, QueueType, Tier } from '../types';

export type ChampionsTierQueueType = Extract<QueueType, 'RANK_SOLO' | 'RANK_FLEX' | 'ARAM'>;

interface RankChampionsTierResponse {
  data: {
    results: { position: Position; champions: ChampionTierDto[] }[];
    version: string;
  };
}

interface AramChampionsTierResponse {
  data: {
    results: ChampionTierDto[];
    version: string;
  };
}

// TODO: 백엔드에 솔랭, 자랭, 칼바람 모두 데이터 구조를 단일화 시켜서 보내달라고 요청
type ChampionsTierResponse = RankChampionsTierResponse | AramChampionsTierResponse;

interface ChampionsTierData {
  data: {
    champions: Record<PositionFilter, ChampionTierDto[]>;
    version: string;
  };
}

interface Options {
  /** 검색하려는 티어대 정보,만약 master를 선택할 경우, 마스터 이상에서 이루어진 게임 정보를 바탕으로 한 챔피언 요약 정보 조회 */
  tier?: Tier;
  /** true로 지정할 경우에 포지션 내에서 score가 가장 높은 상위 5개의 챔피언 티어 정보만 조회 */
  brief?: boolean;
  /** 검색하려는 큐 정보 */
  queue_type?: ChampionsTierQueueType;
}

const championsTierQuery = (options: Options = {}) => {
  // 칼바람일 때 다른 옵션들을 적용되지 않으므로 제외
  options = options.queue_type === 'ARAM' ? { queue_type: options.queue_type } : options;

  return queryOptions({
    queryKey: ['rankTiers', options],
    async queryFn() {
      const res = await request.get<ChampionsTierResponse>('/statistics/champion/stats', {
        params: options,
      });
      return res.data;
    },
    select(data): ChampionsTierData {
      if (options.queue_type === 'ARAM') {
        data = data as AramChampionsTierResponse;
        return {
          data: {
            champions: {
              ALL: data.data.results,
              TOP: [],
              JUNGLE: [],
              MIDDLE: [],
              BOTTOM: [],
              UTILITY: [],
            },
            version: data.data.version,
          },
        };
      }

      data = data as RankChampionsTierResponse;
      const TOP = data.data.results.find((result) => result.position === 'TOP')!.champions;
      const JUNGLE = data.data.results.find((result) => result.position === 'JUNGLE')!.champions;
      const MIDDLE = data.data.results.find((result) => result.position === 'MIDDLE')!.champions;
      const BOTTOM = data.data.results.find((result) => result.position === 'BOTTOM')!.champions;
      const UTILITY = data.data.results.find((result) => result.position === 'UTILITY')!.champions;

      return {
        data: {
          version: data.data.version,
          champions: {
            ALL: [...TOP, ...JUNGLE, ...MIDDLE, ...BOTTOM, ...UTILITY],
            TOP,
            JUNGLE,
            MIDDLE,
            BOTTOM,
            UTILITY,
          },
        },
      };
    },
  });
};

export default championsTierQuery;
