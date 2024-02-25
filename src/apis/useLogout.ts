import httpRequest from '@/apis/httpRequest';

export async function logout() {
  await httpRequest.delete('/community/members/me/logout');
}
