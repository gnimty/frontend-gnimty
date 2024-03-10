import { useFavoriteSummonerMapStore } from './favoriteSummonerMapStore';
import SearchPopBody from './SearchPopBody';

export default function FavoriteSummonersTab() {
  const favoriteSummonerMap = useFavoriteSummonerMapStore((state) => state.favoriteSummonerMap);
  const favoriteSummoners = Object.values(favoriteSummonerMap);

  return <SearchPopBody textWhenEmpty="즐겨찾기한 소환사가 없어요!" items={favoriteSummoners} />;
}
