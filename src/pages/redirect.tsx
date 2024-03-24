import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import httpRequest from '@/apis/httpRequest';
import useCheckToken from '@/apis/useCheckToken';
import { useAuthContext } from '@/contexts/AuthContext';

import type { GetServerSideProps } from 'next';

interface RedirectPageProps {
  redirectUrl: string;
}

function Redirect({ redirectUrl }: RedirectPageProps) {
  const router = useRouter();
  const checkToken = useCheckToken();
  const { setIsAuthenticated } = useAuthContext();

  useEffect(() => {
    setIsAuthenticated(checkToken);
    router.replace(redirectUrl).then();
  }, [checkToken, redirectUrl, router, setIsAuthenticated]);

  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { code, state },
  } = context;

  const encodeData = Array.isArray(state) ? state[0] : state ?? '/';
  try {
    const { redirectUrl, target } = JSON.parse(decodeURIComponent(encodeData.substring(1))) as {
      redirectUrl: string;
      target: 'google' | 'kakao' | 'riot';
    };

    if (target !== 'google' && target !== 'kakao' && target !== 'riot') {
      return {
        props: {
          error: {
            data: encodeData,
          },
        },
        redirect: {
          destination: '/500',
        },
      };
    }

    const host = context.req.headers.host;
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const redirectUri = `${protocol}://${host}/redirect`;

    try {
      const data = {
        authCode: code,
        redirectUri,
      };
      const res = await httpRequest.post(`/community/oauth/${target}`, data);

      context.res.setHeader('Set-Cookie', res.headers['set-cookie'] ?? '');

      return {
        props: {
          redirectUrl,
        },
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
      }

      return {
        props: {
          error,
        },
        redirect: {
          destination: '/500',
        },
      };
    }
  } catch (error) {
    return {
      props: {
        error,
      },
      redirect: {
        destination: '/500',
      },
    };
  }
};

export default Redirect;
