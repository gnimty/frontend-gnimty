import Head from 'next/head';

import RecommendedPick from '@/components/pages/recommended-pick/RecommendedPick';

export default function RecommendedPickRoute() {
  return (
    <>
      <Head>
        <title>추천 Pick!</title>
      </Head>
      <RecommendedPick />
    </>
  );
}
