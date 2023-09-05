import { useState } from 'react';
import { styled } from 'styled-components';

import Filter from '@/components/duo/Filter';
import SummonerCard from '@/components/duo/SummonerCard';

const Container = styled.main`
  width: 67.5rem;
  min-height: 70rem;
  margin: 0 auto;
  padding-top: 2rem;
`;

const SummonerCardsContainer = styled.div`
  width: 67.5rem;
  margin: 0 auto;
  margin-top: 1rem;
  /* display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, 350px); */
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

const SummonerCardsColumn = styled.div`
  width: 352px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default function Duo() {
  const [allOpen, setAllOpen] = useState(false);
  const [cardOpens, setCardOpen] = useState<boolean[]>(Array(18).fill(false));
  const openAll = () => {
    setCardOpen(Array(cardOpens.length).fill(!allOpen));
    setAllOpen((prev) => !prev);
  };
  const toggleCard = (index: number) => {
    setCardOpen((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };
  return (
    <Container>
      <Filter allOpen={allOpen} toggleAll={openAll} />
      <SummonerCardsContainer>
        <SummonerCardsColumn>
          {cardOpens.slice(0, 6).map((open, index) => (
            <SummonerCard key={index} open={open} toggle={() => toggleCard(index)} />
          ))}
        </SummonerCardsColumn>
        <SummonerCardsColumn>
          {cardOpens.slice(6, 12).map((open, index) => (
            <SummonerCard key={index} open={open} toggle={() => toggleCard(index + 6)} />
          ))}
        </SummonerCardsColumn>
        <SummonerCardsColumn>
          {cardOpens.slice(12, 18).map((open, index) => (
            <SummonerCard key={index} open={open} toggle={() => toggleCard(index + 12)} />
          ))}
        </SummonerCardsColumn>
      </SummonerCardsContainer>
    </Container>
  );
}
