import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react';
import Image from 'next/image';

import type { Tier } from '@/apis/types';
import shortTierName from '@/apis/utils/shortTierName';
import Message from '@/assets/icons/system/message.svg';
import summonerDefaultProfile from '@/assets/images/summoner-default-profile.png';
import TierImage from '@/components/common/TierImage';

interface UserCardProps {
  nickname: string;
  tag: string;
  profileImage?: string;
  tier?: Tier;
  division?: number;
  leaguePoints?: number;
  email: string;
}

export default function UserProfileCard({
  nickname,
  tag,
  email,
  tier,
  division,
  leaguePoints,
  profileImage,
}: UserCardProps) {
  return (
    <Flex direction="column" width="324px" height="300px" alignItems="center" gap="24px" bg="white">
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

      <Flex direction="column" alignItems="center" gap="4px">
        <Flex alignItems="center" gap="4px">
          <Text textStyle="h3" fontWeight={700}>
            {nickname}{' '}
          </Text>
          <Text textStyle="t1" fontWeight={400} color="gray600">
            {tag}
          </Text>
        </Flex>

        {tier !== undefined && leaguePoints !== undefined && (
          <Flex alignItems="center" textStyle="t2" gap="4px">
            <TierImage tier={tier} width={24} height={24} />
            <Text fontWeight={700}>{shortTierName(tier, division)}</Text>
            <Text fontWeight={400}>
              {Intl.NumberFormat(undefined, { minimumIntegerDigits: 4 }).format(leaguePoints)}
              LP
            </Text>
          </Flex>
        )}
        <Text textStyle="t2" fontWeight={400}>
          {email}
        </Text>
      </Flex>
      <Button
        textStyle="t2"
        fontWeight={400}
        size="md"
        width="full"
        height="52px"
        variant="line"
        border="0"
        borderTop="1px solid"
        borderColor="gray200"
      >
        비밀번호 변경
      </Button>
    </Flex>
  );
}
