import { useQuery } from '@tanstack/react-query';

import summonerAutoCompleteQuery, { type SummonerAutoCompleteResponse } from '@/apis/queries/summonerAutoCompleteQuery';
import summonerDtoToSearchPopRowItem from '@/utils/summonerDtoToSearchPopRowItem';

import SearchPopBody from './SearchPopBody';

const summonerAutoCompleteToSearchPopRowItems = (data: SummonerAutoCompleteResponse) =>
  data.data.summoners.map(summonerDtoToSearchPopRowItem);

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
