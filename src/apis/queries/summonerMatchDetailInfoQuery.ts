import { queryOptions } from '@tanstack/react-query';

import httpRequest from '@/apis/httpRequest';

import type { MatchDetailRes } from '../types';

interface SummonerMatchesInfoResponse {
  data: MatchDetailRes;
}

interface Options {
  matchId: string;
}

const summonerMatchDetailInfoQuery = (options: Options) =>
  queryOptions({
    queryKey: ['summonerMatchDetailInfo', options],
    async queryFn() {
      const res = await httpRequest.get<SummonerMatchesInfoResponse>(
        `/statistics/summoners/matches/id/${options.matchId}`,
      );
      return res.data;
    },
  });

export default summonerMatchDetailInfoQuery;
