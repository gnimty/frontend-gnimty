import { Avatar, Box, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { Position, Tier } from '@/apis/types';

import CopyIcon from '@/assets/icons/system/copy.svg';
import TierImage from '../common/TierImage';
import PositionImage from '../common/position-image/PositionImage';

interface RankInfo {
  tier: Tier;
  division: number; // 1 ~ 4
  lp: number;
  mainPosition: Position;
  subPosition?: Position;
}

interface UserCardProps {
  username: string;
  hashtag: string;
  avatarUrl: string;
  soloRankInfo: RankInfo;
  flexRankInfo: RankInfo;
}

function UserCard({ username, hashtag, avatarUrl, soloRankInfo, flexRankInfo }: UserCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <VStack w="full" bgColor="gray200" p="12px 16px" spacing="12px">
      {/* 유저 기본정보 */}
      <HStack w="full" h="full" justifyContent="space-between">
        <HStack w="max-content" align="center" spacing="8px">
          <Avatar w={isOpen ? '24px' : '16px'} src={avatarUrl} />
          <HStack w="max-content" align="center" spacing="4px">
            <Box textStyle="t2" color="gray800" fontWeight="700">
              {username}
            </Box>
            <Box textStyle="body" color="gray600">
              {hashtag}
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
          <RankInfo type="solo" rankInfo={soloRankInfo} />
          <RankInfo type="flex" rankInfo={flexRankInfo} />
          <Box textStyle="body" color="gray500" onClick={onClose} alignSelf="end">
            접어두기
          </Box>
        </HStack>
      )}
    </VStack>
  );
}

function RankInfo({ type, rankInfo }: { type: 'solo' | 'flex'; rankInfo: RankInfo }) {
  const { tier, division, lp, mainPosition, subPosition } = rankInfo;
  return (
    <VStack spacing="8px" align="start">
      <Box textStyle="body" color="gray500">
        {type === 'solo' ? '솔로 랭크' : '자유 랭크'}
      </Box>
      <HStack spacing="4px">
        <TierImage tier={tier} width={16} />
        <Box textStyle="body" color="gray800" fontWeight="700">
          {tier.slice(0, 2).toUpperCase()}
        </Box>
        <Box textStyle="body" color="gray500">
          {lp.toLocaleString('ko-KR')}LP
        </Box>
      </HStack>
      <HStack spacing="4px">
        <PositionImage position={mainPosition} width="16px" />
        {subPosition && <PositionImage position={subPosition} width="16px" />}
      </HStack>
    </VStack>
  );
}

export default UserCard;
