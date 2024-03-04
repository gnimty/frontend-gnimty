import { Avatar, Box, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';

import type { SummonerTierDto } from '@/apis/types';
import CopyIcon from '@/assets/icons/system/copy.svg';

import PositionImage from '../common/position-image/PositionImage';
import TierImage from '../common/TierImage';
import profileIconUrl from '@/apis/utils/profileIconUrl';
import shortTierName from '@/apis/utils/shortTierName';

interface UserCardProps {
  summonerName: string;
  tagLine: string;
  profileIconId: number;
  soloTierInfo?: SummonerTierDto;
  flexTierInfo?: SummonerTierDto | null;
}

// TODO: 유저 카드 정보 - 랭크정보, 해시태그 등 추가/수정 필요
function UserCard({ summonerName, tagLine, profileIconId, soloTierInfo, flexTierInfo }: UserCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const theme = useTheme();
  return (
    <VStack
      w="full"
      bgColor="gray200"
      p="12px 16px"
      spacing="12px"
      borderTop={`1px solid ${theme.colors.gray200}`}
      borderBottom={`1px solid ${theme.colors.gray200}`}
    >
      {/* 유저 기본정보 */}
      <HStack w="full" h="full" justifyContent="space-between">
        <HStack w="max-content" align="center" spacing="8px">
          <Avatar w={isOpen ? '24px' : '16px'} src={profileIconUrl(profileIconId)} />
          <HStack w="max-content" align="center" spacing="4px">
            <Box textStyle="t2" color="gray800" fontWeight="700">
              {summonerName}
            </Box>
            <Box textStyle="body" color="gray600">
              {tagLine}
            </Box>
            <CopyIcon width="16" color="gray500" onClick={() => console.log('Copied!')} />
          </HStack>
        </HStack>
        {!isOpen && (
          <Box textStyle="body" color="gray500" onClick={onOpen}>
            펼쳐두기
          </Box>
        )}
      </HStack>
      {/* 유저 정보 디테일 */}
      {isOpen && (
        <HStack w="full" spacing="24px" justifyContent="space-between">
          {soloTierInfo && <RankInfo type="solo" rankInfo={soloTierInfo} />}
          {flexTierInfo && <RankInfo type="flex" rankInfo={flexTierInfo} />}
          <Box textStyle="body" color="gray500" onClick={onClose} alignSelf="end">
            접어두기
          </Box>
        </HStack>
      )}
    </VStack>
  );
}

function RankInfo({ type, rankInfo }: { type: 'solo' | 'flex'; rankInfo: SummonerTierDto }) {
  return (
    <VStack spacing="8px" align="start">
      <Box textStyle="body" color="gray500">
        {type === 'solo' ? '솔로 랭크' : '자유 랭크'}
      </Box>
      <HStack spacing="4px">
        <TierImage tier={rankInfo?.tier} width={16} />
        <Box textStyle="body" color="gray800" fontWeight="700">
          {shortTierName(rankInfo?.tier)}
        </Box>
        <Box textStyle="body" color="gray500">
          {rankInfo?.lp.toLocaleString('ko-KR')}LP
        </Box>
      </HStack>
      <HStack spacing="4px">
        {rankInfo?.mostLanes?.map((lane) => {
          return <PositionImage key={lane} position={lane} width="16px" />;
        })}
      </HStack>
    </VStack>
  );
}

export default UserCard;
