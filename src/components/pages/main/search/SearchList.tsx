import { useQuery } from '@tanstack/react-query';

import summonerAutoCompleteQuery, { type SummonerAutoCompleteResponse } from '@/apis/queries/summonerAutoCompleteQuery';
import summonerDtoToSearchPopRowItem from '@/utils/summonerDtoToSearchPopRowItem';

import SearchPopBody from './SearchPopBody';

const summonerAutoCompleteToSearchPopRowItems = (data: SummonerAutoCompleteResponse) =>
  data.data.summoners.map(summonerDtoToSearchPopRowItem);

interface SearchListProps {
  keyword: string;
  /**
   * @description XButtonClick이 기본동작이 아닌 경우에 사용 (추천Pick 화면)
   * @param summonerProfile
   * @returns void
   */
  onCustomXButtonClick?: (summonerName: string) => void;
}

export default function SearchList(props: SearchListProps) {
  const { keyword, onCustomXButtonClick } = props;

  const { data: items, status } = useQuery({
    ...summonerAutoCompleteQuery({ keyword }),
    select: summonerAutoCompleteToSearchPopRowItems,
  });

  if (status !== 'success') {
    return;
  }

  return <SearchPopBody items={items} onCustomXButtonClick={onCustomXButtonClick} />;
}
