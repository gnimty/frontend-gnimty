import type { AxiosError } from 'axios';

interface APIError {
  status: {
    message: string;
    code: number;
  };
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<APIError>;
  }
}
