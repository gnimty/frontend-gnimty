import Head from 'next/head';

import Main from '@/components/pages/main/Main';
import MyPage from '@/components/pages/mypage/MyPage';

export default function MainRoute() {
  return (
    <>
      <Head>
        <title>그님티</title>
      </Head>
      <MyPage />
    </>
  );
}
