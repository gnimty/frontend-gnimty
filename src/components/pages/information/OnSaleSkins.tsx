import { Grid } from '@chakra-ui/react';

import skinSales from '@/apis/mocks/skinSales';

import OnSaleCard from './OnSaleCard';

export default function OnSaleSkins() {
  const onSaleSkins = skinSales;

  return (
    <Grid as="ul" gap="12px" templateColumns="repeat(3, 352px)">
      {onSaleSkins.map((skin) => (
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
