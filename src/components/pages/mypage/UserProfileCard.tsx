import { Box, Button, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

import type { Tier } from '@/apis/types';
import Message from '@/assets/icons/system/message.svg';
import summonerDefaultProfile from '@/assets/images/summoner-default-profile.png';
import TierImage from '@/components/common/TierImage';

interface UserCardProps {
  nickname: string;
  profileImage?: string;
  tier: Tier;
  leaguePoints: number;
  email: string;
}

export default function UserProfileCard({ nickname, email, tier, leaguePoints, profileImage }: UserCardProps) {
  return (
    <VStack width="324px" height="300px" alignItems="center" gap="24px" bg="white">
      <Box position="relative" mt="40px">
        <Image src={profileImage ?? summonerDefaultProfile} width={80} height={80} alt="" />
        <IconButton
          position="absolute"
          right="3px"
          bottom="3px"
          aria-label="edit-profile"
          isRound={true}
          w="20px"
          bg="main"
          h="20px"
          icon={<Message width="12px" height="12px" color="white" />}
        />
      </Box>

      <VStack className="user-info" gap="4px">
        <Text textStyle="h3" fontWeight={700}>
          {nickname}
        </Text>
        <HStack textStyle="t2" gap="4px">
          <TierImage tier={tier} width={24} height={24} />
          <Text fontWeight={700}>GM</Text>
          <Text fontWeight={400}>
            {leaguePoints
              .toString()
              .padStart(4, '0')
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            LP
          </Text>
        </HStack>
        <Text textStyle="t2" fontWeight={400}>
          {email}
        </Text>
      </VStack>
      <Button
        size="md"
        width="full"
        height="52px"
        variant="line"
        border="0"
        borderTop="1px solid"
        borderColor="gray200"
      >
        개인 정보 변경
      </Button>
    </VStack>
  );
}
