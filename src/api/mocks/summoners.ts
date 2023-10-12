import type { SummonerEntry } from '../types';

const summoners: SummonerEntry[] = [
  {
    id: 1,
    name: '심심한 잉여임다',
    status: 'ONLINE',
    tier: 'emerald',
    leaguePoints: 5000,
    positions: ['TOP', 'JUNGLE'],
    champions: ['Naafiri', 'Malphite', 'Camille'],
    introduction:
      '나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄 이런 전차로 어린 백셩이 니르고져 홇베이셔도 마참네 제 뜨들 시러펴디 몯핧 노미하니아 내 이랄 윙하여 어엿비너겨 새로 스믈 여듫 짜랄 맹가노니 사람마다 해여 수비니겨 날로 쑤메 뻔한킈 하고져 할따라미니라',
  },
  {
    id: 2,
    name: '밤새모니터에튀긴침이마르기도전에',
    status: 'OFFLINE',
    tier: 'UNRANKED',
    leaguePoints: 300,
    positions: ['BOTTOM'],
    champions: ['Camille'],
    introduction: '나랏말싸미 듕귁에 달아 문자와로',
  },
  {
    id: 3,
    name: 'T1 Gumayusi',
    status: 'AWAY',
    tier: 'diamond',
    leaguePoints: 25,
    positions: ['BOTTOM', 'UTILITY'],
    champions: ['Vayne', 'Blitzcrank', 'Braum'],
    introduction:
      '나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄 이런 전차로 어린 백셩이 니르고져 홇베이셔도 마참네 제',
  },
  {
    id: 4,
    name: '역천괴',
    status: 'OFFLINE',
    tier: 'grandmaster',
    leaguePoints: 0,
    positions: ['MIDDLE', 'JUNGLE'],
    champions: ['Gnar', 'Trundle'],
    introduction: '나랏말싸미 듕귁에 달아 문자와로 서르 사맛디',
  },
  {
    id: 5,
    name: 'Hide on bush',
    status: 'ONLINE',
    tier: 'challenger',
    leaguePoints: 9999,
    positions: ['MIDDLE'],
    champions: ['Leblanc', 'Ryze'],
    introduction:
      '나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄 이런 전차로 어린 백셩이 니르고져 홇베이셔도 마참네 제 뜨들 시러펴디 몯핧 노미하니아 내 이랄 윙하여 어엿비너겨',
  },
];

export default summoners;
