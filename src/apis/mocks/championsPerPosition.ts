import type { ChampionTier, Position } from '../types';

const championsPerPosition: Record<
  Position,
  { image: string; name: string; tier: ChampionTier; winPercent: string; pickRate: string }[]
> = {
  TOP: [
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Nasus.png',
      name: '나서스',
      tier: '1',
      winPercent: '99.99',
      pickRate: '54.00',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Malphite.png',
      name: '말파이트',
      tier: '1',
      winPercent: '76.00',
      pickRate: '49.00',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Camille.png',
      name: '카밀',
      tier: '2',
      winPercent: '68.57',
      pickRate: '48.79',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Renekton.png',
      name: '레넥톤',
      tier: '2',
      winPercent: '64.12',
      pickRate: '47.55',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Darius.png',
      name: '다리우스',
      tier: '3',
      winPercent: '01.00',
      pickRate: '05.09',
    },
  ],
  JUNGLE: [
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Nasus.png',
      name: '나서스',
      tier: '1',
      winPercent: '99.99',
      pickRate: '99.12',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Evelynn.png',
      name: '이블린',
      tier: '1',
      winPercent: '97.12',
      pickRate: '98.42',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/LeeSin.png',
      name: '리 신',
      tier: '4',
      winPercent: '32.46',
      pickRate: '25.75',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Nocturne.png',
      name: '녹턴',
      tier: '5',
      winPercent: '29.34',
      pickRate: '06.23',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/JarvanIV.png',
      name: '자르반 4세',
      tier: '5',
      winPercent: '15.55',
      pickRate: '02.92',
    },
  ],
  MIDDLE: [
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Veigar.png',
      name: '베이가',
      tier: '1',
      winPercent: '97.42',
      pickRate: '70.56',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/TwistedFate.png',
      name: '트위스티드 페이트',
      tier: '1',
      winPercent: '46.52',
      pickRate: '20.66',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Singed.png',
      name: '신지드',
      tier: '3',
      winPercent: '34.45',
      pickRate: '19.66',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Anivia.png',
      name: '애니비아',
      tier: '4',
      winPercent: '12.85',
      pickRate: '11.11',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Kassadin.png',
      name: '카사딘',
      tier: '5',
      winPercent: '11.55',
      pickRate: '61.67',
    },
  ],
  BOTTOM: [
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Nasus.png',
      name: '나서스',
      tier: '1',
      winPercent: '99.99',
      pickRate: '54.00',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Malphite.png',
      name: '말파이트',
      tier: '1',
      winPercent: '76.00',
      pickRate: '49.00',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Camille.png',
      name: '카밀',
      tier: '2',
      winPercent: '68.57',
      pickRate: '48.79',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Renekton.png',
      name: '레넥톤',
      tier: '2',
      winPercent: '64.12',
      pickRate: '47.55',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Darius.png',
      name: '다리우스',
      tier: '3',
      winPercent: '01.00',
      pickRate: '05.09',
    },
  ],
  UTILITY: [
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Veigar.png',
      name: '베이가',
      tier: '1',
      winPercent: '97.42',
      pickRate: '70.56',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/TwistedFate.png',
      name: '트위스티드 페이트',
      tier: '1',
      winPercent: '46.52',
      pickRate: '20.66',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Singed.png',
      name: '신지드',
      tier: '3',
      winPercent: '34.45',
      pickRate: '19.66',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Anivia.png',
      name: '애니비아',
      tier: '4',
      winPercent: '12.85',
      pickRate: '11.11',
    },
    {
      image: 'https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Kassadin.png',
      name: '카사딘',
      tier: '5',
      winPercent: '11.55',
      pickRate: '61.67',
    },
  ],
};

export default championsPerPosition;
