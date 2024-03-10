import type { SummonerDto } from '@/apis/types';
import type { SearchPopRowItem } from '@/components/pages/main/search/SearchPopRow';

export default function summonerDtoToSearchPopRowItem(summoner: SummonerDto): SearchPopRowItem {
  return {
    puuid: summoner.puuid,
    summonerName: summoner.summonerName,
    tagLine: summoner.tagLine,
    profileIconId: summoner.profileIconId,
    // TODO: 동적으로 설정
    isVerified: false,
  };
}
