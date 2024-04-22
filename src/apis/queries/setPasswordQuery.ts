import httpRequest, { type BaseResponse } from '../httpRequest';

interface SetPasswordOptions {
  email: string;
  password: string;
  uuid: string;
}

interface SetPasswordResponse extends BaseResponse {}

export const patchPassword = async ({ email, password, uuid }: SetPasswordOptions) =>
  httpRequest.patch<SetPasswordResponse>('/community/members/password', { email, password, uuid });
