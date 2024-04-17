import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import httpRequest from '@/apis/httpRequest';

import type { GetServerSideProps } from 'next';

interface RedirectPageProps {
  redirectUrl: string;
}

function Redirect({ redirectUrl }: RedirectPageProps) {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      router.replace(redirectUrl);
    }
  }, [redirectUrl, router]);

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
      target: 'google' | 'kakao';
    };

    if (target !== 'google' && target !== 'kakao') {
      return {
        props: {},
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
        props: {},
        redirect: {
          destination: '/500',
        },
      };
    }
  } catch (e) {
    return {
      props: {},
      redirect: {
        destination: '/500',
      },
    };
  }
};

export default Redirect;
