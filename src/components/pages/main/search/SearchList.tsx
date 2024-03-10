import { useQuery } from '@tanstack/react-query';

import summonerAutoCompleteQuery, { type SummonerAutoCompleteResponse } from '@/apis/queries/summonerAutoCompleteQuery';

import SearchPopBody from './SearchPopBody';

const summonerAutoCompleteToSearchPopRowItems = (data: SummonerAutoCompleteResponse) =>
  data.data.summoners.map((summoner) => ({
    puuid: summoner.puuid,
    summonerName: summoner.summonerName,
    tagLine: summoner.tagLine,
    profileIconId: summoner.profileIconId,
    isVerified: false,
  }));

interface SearchListProps {
  keyword: string;
}

export default function SearchList(props: SearchListProps) {
  const { keyword } = props;

  const { data: items, status } = useQuery({
    ...summonerAutoCompleteQuery({ keyword }),
    select: summonerAutoCompleteToSearchPopRowItems,
  });

  if (status !== 'success') {
    return;
  }

  return <SearchPopBody items={items} />;
}
