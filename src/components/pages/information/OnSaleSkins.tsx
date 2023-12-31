import { Grid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import onSaleSkinsQuery from '@/apis/queries/onSaleSkinsQuery';

import OnSaleCard from './OnSaleCard';

export default function OnSaleSkins() {
  const { data, status } = useQuery(onSaleSkinsQuery());

  if (status !== 'success') {
    return;
  }

  return (
    <Grid as="ul" gap="12px" templateColumns="repeat(3, 352px)">
      {data.data.skinSales.map((skin) => (
        <OnSaleCard
          key={skin.skinName}
          as="li"
          name={skin.skinName}
          imgUrl={skin.skinImgUrl}
          originRp={skin.originRp}
          discountedRp={skin.discountedRp}
          discountedRate={skin.discountedRate}
        />
      ))}
    </Grid>
  );
}
