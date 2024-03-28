import { queryOptions } from '@tanstack/react-query';

import request, { type BaseResponse } from '../httpRequest';

import type { ChampionAnalysisResponse, PositionFilter, Tier } from '../types';
import type { AxiosError } from 'axios';

interface ChampionDetailResponse extends BaseResponse {
  data: ChampionAnalysisResponse;
}

interface Options {
  championEnName: string;
  lane?: PositionFilter | 'UNKNOWN' | '';
  tier?: Tier;
}

const championDetailQuery = ({ championEnName, lane, tier }: Options) =>
  queryOptions({
    queryKey: ['championDetail', championEnName, lane, tier],
    async queryFn() {
      try {
        const res = await request.get<ChampionDetailResponse>(`/statistics/champion/stats/detail/${championEnName}`, {
          params: { lane, tier },
        });
        return res.data;
      } catch (error: unknown) {
        if ((error as AxiosError)?.response?.status === 404) {
          throw new Error('챔피언 정보를 찾을 수 없습니다.');
        }
        throw error;
      }
    },
    retry: 0,
  });

export default championDetailQuery;
