import { Grid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import onSaleChampionsQuery from '@/apis/queries/onSaleChampionsQuery';
import championSplashUrl from '@/apis/utils/championSplashUrl';

import OnSaleCard from './OnSaleCard';

export default function OnSaleChampions() {
  const { data, status } = useQuery(onSaleChampionsQuery());

  if (status !== 'success') {
    return;
  }

  return (
    <Grid as="ul" gap="12px" templateColumns="repeat(3, 352px)">
      {data.data.championSales.map((champ) => (
        <OnSaleCard
          key={champ.championId}
          as="li"
          name={champ.krName}
          imgUrl={championSplashUrl(champ.championId)}
          originRp={champ.originRp}
          discountedRp={champ.discountedRp}
          discountedRate={champ.discountedRate}
          originIp={champ.originIp}
        />
      ))}
    </Grid>
  );
}
