import { AxiosError } from 'axios';
import { red } from 'next/dist/lib/picocolors';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import httpRequest from '@/apis/httpRequest';
import useCheckToken from '@/apis/useCheckToken';
import { useAuthContext } from '@/contexts/AuthContext';

import type { GetServerSideProps } from 'next';

interface RedirectPageProps {
  redirectUrl: string;
  debugData: unknown;
}

function Redirect({ redirectUrl, debugData }: RedirectPageProps) {
  const router = useRouter();
  const checkToken = useCheckToken();
  const { setIsAuthenticated } = useAuthContext();

  console.log(redirectUrl);
  console.log(debugData);

  const onClick = () => {
    router.replace(redirectUrl).then();
  };

  useEffect(() => {
    setIsAuthenticated(checkToken);
    // router.replace(redirectUrl).then();
  }, [checkToken, redirectUrl, router, setIsAuthenticated]);

  return <button onClick={onClick}>Click</button>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { code, state },
  } = context;

  const encodeData = Array.isArray(state) ? state[0] : state ?? '/';

  const debugData: Record<string, unknown> = {
    code: code,
    state: state,
    encodeData: encodeData,
    redirectUrl: '',
    target: '',
    host: '',
    protocol: '',
    redirectUri: '',
    res: undefined,
    error: null,
  };

  try {
    const { redirectUrl, target } = JSON.parse(decodeURIComponent(encodeData.substring(1))) as {
      redirectUrl: string;
      target: 'google' | 'kakao' | 'riot';
    };

    debugData.redirectUrl = redirectUrl;
    debugData.target = target;

    if (target !== 'google' && target !== 'kakao' && target !== 'riot') {
      return {
        props: {
          error: {
            data: encodeData,
          },
          debugData,
        },
        /*redirect: {
          destination: '/500',
        },*/
      };
    }

    const host = context.req.headers.host;
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const redirectUri = `${protocol}://${host}/redirect`;

    debugData.host = host;
    debugData.protocol = protocol;
    debugData.redirectUri = redirectUri;

    try {
      const data = {
        authCode: code,
        redirectUri,
      };
      const res = await httpRequest.post(target === 'riot' ? `/members/me/rso` : `/community/oauth/${target}`, data);
      debugData.res = res;

      context.res.setHeader('Set-Cookie', res.headers['set-cookie'] ?? '');

      return {
        props: {
          redirectUrl,
        },
      };
    } catch (error) {
      debugData.error = error;
      if (error instanceof AxiosError) {
        console.error(error);
      }

      return {
        props: {
          error,
          debugData,
        },
        /*redirect: {
          destination: '/500',
        },*/
      };
    }
  } catch (error) {
    debugData.error = error;
    return {
      props: {
        error,
        debugData,
      },
      /*redirect: {
        destination: '/500',
      },*/
    };
  }
};

export default Redirect;
