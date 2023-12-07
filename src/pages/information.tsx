import Head from 'next/head';

import Information from '@/components/pages/information/Information';

export default function InformationRoute() {
  return (
    <>
      <Head>
        <title>할인/패치노트</title>
      </Head>
      <Information />
    </>
  );
}
