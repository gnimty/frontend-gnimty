import httpRequest, { type BaseResponse } from '../httpRequest';

interface MemberLikeResponse extends BaseResponse {}

interface MemberLikeOptions {
  targetMemberId: number;
  cancel: boolean;
}

export const postMemberLike = async ({ targetMemberId, cancel }: MemberLikeOptions) => {
  const res = await httpRequest.post<MemberLikeResponse>('/community/members/me/like', {
    targetMemberId,
    cancel,
  });
  return res.data;
};
