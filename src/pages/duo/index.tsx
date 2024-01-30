import { Grid, useDisclosure, VStack } from '@chakra-ui/react';
import DetailDrawer from '@/components/duo/DetailDrawer';
import Filter from '@/components/duo/Filter';
import { useState } from 'react';

export default function Duo() {
  const drawerDisclosure = useDisclosure();
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
            <div key={index} onClick={() => toggleCard(index)}>
              {open ? '열림' : '닫힘'}
            </div>
          ))}
        </Grid>
      </VStack>
    </>
  );
}
