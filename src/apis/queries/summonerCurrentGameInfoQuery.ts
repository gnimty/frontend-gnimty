import { queryOptions } from '@tanstack/react-query';

import httpRequest from '@/apis/httpRequest';

import type { CurrentGameParticipantDto, QueueDto } from '../types';

interface SummonerCurrentGameInfoResponse {
  data: {
    participants: CurrentGameParticipantDto[];
    queueInfo: QueueDto;
    gameStartTime: string;
    gameLength: number;
  };
}

interface Options {
  /**
   * 조회할 소환사 태그네임, [소환사명]-[태그라인]
   */
  summonerTagName: string;
}

const summonerCurrentGameInfoQuery = (options: Options) =>
  queryOptions({
    queryKey: ['summonerCurrentGameInfo', options],
    async queryFn() {
      const res = await httpRequest.get<SummonerCurrentGameInfoResponse>(
        `/statistics/summoners/ingame/${options.summonerTagName}`,
      );
      return res.data;
    },
  });

export default summonerCurrentGameInfoQuery;
