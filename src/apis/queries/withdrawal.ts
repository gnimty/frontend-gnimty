import httpRequest from '../httpRequest';

export const withdrawal = async () => httpRequest.delete('/community/members/me');
