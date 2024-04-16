import { queryOptions } from '@tanstack/react-query';

import request, { type BaseResponse } from '../httpRequest';

import type { ChampionCommentsResponse, CommentsType, Position, Tier } from '../types';

interface CommonResponseChampionCommentsResponse extends BaseResponse {
  data: ChampionCommentsResponse;
}

interface GetOption {
  championId: number;
}

/**
 *  운용법 조회
 */
export const championComments = ({ championId }: GetOption) =>
  queryOptions({
    queryKey: ['championComments', championId],
    async queryFn() {
      const res = await request.get<CommonResponseChampionCommentsResponse>(
        `/community/champions/${championId}/comments`,
      );
      return res.data;
    },
  });

interface PostOption extends GetOption {
  internalTagName: string;
  tier: Tier;
  division: number;
  lane: Position;
  opponentChampionId: number;
  depth: number; // 0 or 1 - depth 0일 경우, lane, opponentChampionId, commentsType이 작성 가능 1인 경우 불가능
  mentionedInternalTagName: string;
  contents: string;
  commentsType: CommentsType;
  parentChampionCommentsId: number;
}

interface PostResponse extends BaseResponse {}
/**
 * 운용법 추가
 */
export const addChampionComments = async ({ championId, ...rest }: PostOption) => {
  return await request.post<PostResponse>(`/community/champions/${championId}/comments`, rest);
};

interface PatchOption extends GetOption {
  mentionedInternalTagName: string;
  contents: string;
}

interface PatchResponse extends BaseResponse {}

/**
 * 운용법 수정
 */
export const patchChampionComments = async ({ championId, ...rest }: PatchOption) => {
  return await request.patch<PatchResponse>(`/community/champions/${championId}/comments`, rest);
};

interface DeleteOption extends GetOption {
  commentsId: number;
}

interface DeleteResponse extends BaseResponse {}

/**
 * 운용법 댓글 삭제
 */
export const deleteChampionComments = async ({ championId, commentsId }: DeleteOption) => {
  return await request.delete<DeleteResponse>(`/community/champions/${championId}/comments/${commentsId}`);
};

interface LikeOption extends GetOption {
  commentsId: number;
  likeOrNot: boolean;
  cancel: boolean;
}

/**
 * 운용법 댓글 추천/비추천
 */
export const likeChampionComments = async ({ championId, commentsId, likeOrNot, cancel }: LikeOption) => {
  return await request.post<BaseResponse>(`/community/champions/${championId}/comments/${commentsId}/like`, {
    likeOrNot,
    cancel,
  });
};

interface ReportOption extends GetOption {
  commentsId: number;
  reportType: 'ABUSE' | 'OTHER';
  reportComment?: string;
}

/**
 * 운용법 댓글 신고
 * reportType이 Other이면 reportComment 필수
 */
export const reportChampionComments = async ({ championId, commentsId, reportType, reportComment }: ReportOption) => {
  return await request.post<BaseResponse>(`/community/champions/${championId}/comments/${commentsId}report`, {
    reportType,
    reportComment,
  });
};
