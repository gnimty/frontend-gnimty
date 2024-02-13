import { Grid, useDisclosure, VStack } from '@chakra-ui/react';
import DetailDrawer from '@/components/duo/DetailDrawer';
import Filter from '@/components/duo/Filter';
import { useState } from 'react';
import SummonerCard from '@/components/duo/SummonerCard';

export default function Duo() {
  const drawerDisclosure = useDisclosure();
  const [requestParams, setRequestParams] = useState({
    preferenceChampions: [],
    sortType: '',
    duoAvailable: false,
    timeAvailable: false,
  });

  const updateRequestParams = (toUpdate: { [key: string]: any }) =>
    setRequestParams((prev) => ({ ...prev, ...toUpdate }));

  const [allOpen, setAllOpen] = useState(false);
  // TODO: 서버에서 받아온 CARD로 교체
  const [cardOpens, setCardOpens] = useState<boolean[]>(() => Array(18).fill(false));
  const toggleAll = () => {
    setCardOpens(Array(cardOpens.length).fill(!allOpen));
    setAllOpen((prev) => !prev);
  };
  const toggleCard = (index: number) => {
    setCardOpens((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };
  return (
    <>
      <DetailDrawer disclosure={drawerDisclosure} />
      <VStack maxW="1080px" spacing="16px" m="0 auto" pt="40px">
        <Filter disclosure={drawerDisclosure} allOpen={allOpen} toggleAll={toggleAll} />
        <Grid templateColumns="repeat(3, 350px)" gap="12px">
          {cardOpens.map((open, index) => (
            <SummonerCard key={index} open={open} toggle={() => toggleCard(index)} />
          ))}
        </Grid>
      </VStack>
    </>
  );
}
