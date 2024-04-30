import httpRequest, { type BaseResponse } from '../httpRequest';

interface ChnagePasswordOptions {
  currentPassword: string;
  newPassword: string;
}

interface ChangePasswordResponse extends BaseResponse {}

export const changePassword = async ({ currentPassword, newPassword }: ChnagePasswordOptions) =>
  httpRequest.patch<ChangePasswordResponse>('/community/members/me/password', { currentPassword, newPassword });
