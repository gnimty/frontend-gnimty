import { useState } from 'react';
import { styled } from 'styled-components';

import DetailFilter from '@/components/duo/DetailFilter';
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
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, 350px);
`;

const Dimmed = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.dim60};
`;

export default function Duo() {
  const [detailOpen, setDetailOpen] = useState(false);
  const [allOpen, setAllOpen] = useState(false);
  const [cardOpens, setCardOpen] = useState<boolean[]>(Array(18).fill(false));
  const openAll = () => {
    setCardOpen(Array(cardOpens.length).fill(!allOpen));
    setAllOpen((prev) => !prev);
  };
  const toggleDetail = () => setDetailOpen((prev) => !prev);
  const toggleCard = (index: number) => {
    setCardOpen((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };
  return (
    <>
      <Dimmed $open={detailOpen} onClick={toggleDetail} />
      <DetailFilter detailOpen={detailOpen} toggleDetail={toggleDetail} />
      <Container>
        <Filter allOpen={allOpen} toggleAll={openAll} detailOpen={detailOpen} toggleDetail={toggleDetail} />
        <SummonerCardsContainer>
          {cardOpens.map((open, index) => (
            <SummonerCard key={index} open={open} toggle={() => toggleCard(index)} />
          ))}
        </SummonerCardsContainer>
      </Container>
    </>
  );
}
