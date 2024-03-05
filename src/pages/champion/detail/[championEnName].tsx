import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ChampionDetail() {
  const { championEnName } = useRouter().query;
  return (
    <Head>
      <title>{championEnName} - 그님티</title>
    </Head>
  );
}
