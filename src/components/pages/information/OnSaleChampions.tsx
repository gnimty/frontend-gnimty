import { Grid } from '@chakra-ui/react';

import championSales from '@/api/mocks/championSales';

import OnSaleCard from './OnSaleCard';

export default function OnSaleChampions() {
  const onSaleChampions = championSales;

  return (
    <Grid as="ul" gap="12px" templateColumns="repeat(3, 352px)">
      {onSaleChampions.map((champ) => (
        <OnSaleCard
          key={champ.championId}
          as="li"
          name={champ.krName}
          imgUrl={`https://cdn-store.leagueoflegends.co.kr/images/v2/champion-splashes/${champ.championId}000.jpg`}
          originRp={champ.originRp}
          discountedRp={champ.discountedRp}
          discountedRate={champ.discountedRate}
          originIp={champ.originIp}
        />
      ))}
    </Grid>
  );
}
