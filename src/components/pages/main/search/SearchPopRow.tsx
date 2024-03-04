import { Link } from '@chakra-ui/next-js';
import { HStack, IconButton, Text } from '@chakra-ui/react';

import ExitIcon from '@/assets/icons/system/exit.svg';
import ProfileImage from '@/components/common/ProfileImage';
import VerifiedTag from '@/components/common/VerifiedTag';
import FavoriteIcon from '@/components/icons/FavoriteIcon';

import useFavoriteSummonerMapStore from './useFavoriteSummonerMapStore';

export interface SearchPopRowItem {
  puuid: string;
  profileIconId: number;
  summonerName: string;
  tagLine: string;
  isVerified: boolean;
}

export interface SearchPopRowProps {
  searchPopRowItem: SearchPopRowItem;
  onXButtonClick?: () => void;
}

export default function SearchPopRow(props: SearchPopRowProps) {
  const { searchPopRowItem, onXButtonClick } = props;

  const favoriteSummonerMap = useFavoriteSummonerMapStore((state) => state.favoriteSummonerMap);
  const toggleFavoriteSummoner = useFavoriteSummonerMapStore((state) => state.toggleFavoriteSummoner);

  const isFavorite = Object.hasOwn(favoriteSummonerMap, searchPopRowItem.puuid);

  return (
    <HStack w="full" justify="space-between">
      <Link
        href={`/summoners/${searchPopRowItem.summonerName}-${searchPopRowItem.tagLine}`}
        display="flex"
        alignItems="center"
        gap="12px"
        textDecor="none"
      >
        <ProfileImage iconId={searchPopRowItem.profileIconId} width={24} height={24} />
        <HStack gap="4px">
          <Text textStyle="t2" fontWeight="regular" color="gray800">
            {searchPopRowItem.summonerName}
          </Text>
          <Text textStyle="body" fontWeight="regular" color="gray600">
            #{searchPopRowItem.tagLine}
          </Text>
        </HStack>
        {searchPopRowItem.isVerified && <VerifiedTag />}
      </Link>
      <HStack gap="12px">
        <IconButton
          aria-label={`즐겨찾기 ${isFavorite ? '취소' : '등록'}`}
          onClick={() => {
            toggleFavoriteSummoner(searchPopRowItem);
          }}
          display="inline-flex"
        >
          <FavoriteIcon isOn={isFavorite} width={20} height={20} />
        </IconButton>
        {onXButtonClick && (
          <IconButton aria-label="최근 검색에서 삭제" onClick={onXButtonClick} display="inline-flex">
            <ExitIcon width={20} height={20} />
          </IconButton>
        )}
      </HStack>
    </HStack>
  );
}
