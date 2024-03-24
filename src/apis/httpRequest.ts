import axios from 'axios';

import type { DefaultError } from '@tanstack/react-query';

const httpRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export interface BaseResponse {
  status: {
    message: string;
    code: number;
  };
}

export interface BaseMutationProps<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown> {
  onSuccess?: (data: TData, variables: TVariables, context: TContext) => void;
  onError?: (error: TError, variables: TVariables, context: TContext) => void;
}

export default httpRequest;
