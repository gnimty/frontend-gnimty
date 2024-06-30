import { useQuery } from '@tanstack/react-query';

import summonerAutoCompleteQuery, { type SummonerAutoCompleteResponse } from '@/apis/queries/summonerAutoCompleteQuery';
import summonerDtoToSearchPopRowItem from '@/utils/summonerDtoToSearchPopRowItem';

import SearchPopBody from './SearchPopBody';

import type { SearchPopRowItem } from './SearchPopRow';

const summonerAutoCompleteToSearchPopRowItems = (data: SummonerAutoCompleteResponse) =>
  data.data.summoners.map(summonerDtoToSearchPopRowItem);

interface SearchListProps {
  keyword: string;
  /**
   * XButtonClick이 기본동작이 아닌 경우에 사용 (추천Pick 화면)
   */
  onSelect?: (searchPopRowItem: SearchPopRowItem) => void;
}

export default function SearchList(props: SearchListProps) {
  const { keyword, onSelect } = props;

  const { data: items, status } = useQuery({
    ...summonerAutoCompleteQuery({ keyword }),
    select: summonerAutoCompleteToSearchPopRowItems,
  });

  if (status !== 'success') {
    return;
  }

  return <SearchPopBody items={items} onSelect={onSelect} />;
}
