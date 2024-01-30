import Head from 'next/head';

import MyPage from '@/components/pages/mypage/MyPage';

export default function MainRoute() {
  return (
    <>
      <Head>
        <title>마이페이지</title>
      </Head>
      <MyPage />
    </>
  );
}
