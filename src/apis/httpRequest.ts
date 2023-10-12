import axios from 'axios';

const httpRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});
httpRequest.interceptors.request.use(function (config) {
  return config;
});
export default httpRequest;
