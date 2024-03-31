import { queryOptions } from '@tanstack/react-query';

import httpRequest from '@/apis/httpRequest';

import type { CurrentGameParticipantDto, QueueDto } from '../types';

export const enum SUMMONER_CURRENT_GAME_INFO_ERROR_CODE {
  /** 현재 소환자가 게임 중이 아닐 때 */
  NOT_IN_GAME = 404,
}

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
    retry(failureCount, error) {
      if (error.response?.data.status.code === SUMMONER_CURRENT_GAME_INFO_ERROR_CODE.NOT_IN_GAME) {
        return false;
      }
      return failureCount <= 3;
    },
  });

export default summonerCurrentGameInfoQuery;
