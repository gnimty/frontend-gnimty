import httpRequest, { type BaseResponse } from '../httpRequest';

interface MemberBlockRequest {
  id: number;
  memo?: string;
}

interface MemberBlockResponse extends BaseResponse {}

export const memberBlock = async (request: MemberBlockRequest) =>
  await httpRequest.post<MemberBlockResponse>('/community/members/me/block', request);
