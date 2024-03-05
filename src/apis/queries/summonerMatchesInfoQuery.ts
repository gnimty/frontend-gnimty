import { queryOptions } from '@tanstack/react-query';

import httpRequest from '@/apis/httpRequest';

import type { MatchSummaryDto, SummonerDto } from '../types';

interface SummonerMatchesInfoResponse {
  data: {
    summoner: SummonerDto;
    renewableAfter: string;
    // TODO: 추후 사용할 때 추가
    matches: never[];
    matchSummary: MatchSummaryDto;
  };
}

interface Options {
  /**
   * 조회할 소환사 태그네임, [소환사명]-[태그라인]
   */
  summonerTagName: string;
}

const summonerMatchesInfoQuery = (options: Options) =>
  queryOptions({
    queryKey: ['summonerMatchesInfo', options],
    async queryFn() {
      const res = await httpRequest.get<SummonerMatchesInfoResponse>(
        `/statistics/summoners/matches/${options.summonerTagName}`,
      );
      return res.data;
    },
  });

export default summonerMatchesInfoQuery;
