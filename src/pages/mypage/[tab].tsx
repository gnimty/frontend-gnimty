import Head from 'next/head';

import MyPage from '@/components/pages/mypage/MyPage';

import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

export type MyPageTab = 'info' | 'change-state' | 'manage-block';

interface MyPageRouteParams extends ParsedUrlQuery {
  tab: MyPageTab;
}

export interface MyPageRouteProps {
  tab: MyPageTab;
}

export default function MyPageRoute(props: MyPageRouteProps) {
  const { tab } = props;

  return (
    <>
      <Head>
        <title>마이페이지</title>
      </Head>
      <MyPage tab={tab} />
    </>
  );
}

export const getStaticPaths = (() => {
  return {
    paths: (['info', 'change-state', 'manage-block'] as const).map((tab) => ({ params: { tab } })),
    fallback: false,
  };
}) satisfies GetStaticPaths<MyPageRouteParams>;

export const getStaticProps = ((context) => {
  if (context.params === undefined) {
    return { notFound: true };
  }
  return { props: { tab: context.params.tab } };
}) satisfies GetStaticProps<MyPageRouteProps, MyPageRouteParams>;
