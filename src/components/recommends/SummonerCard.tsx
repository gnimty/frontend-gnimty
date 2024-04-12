import { Box, Text, VStack, HStack, Button } from '@chakra-ui/react';

import Like from '@/assets/icons/system/like.svg';

import ChampionIcon from '../common/ChampionIcon';
import ProfileImage from '../common/ProfileImage';
import TierImage from '../common/TierImage';

const SummonerCard = () => {
  return (
    <VStack w="320px" borderRadius="8px" bgColor="white" p="60px 20px 20px 20px" gap="40px">
      <Box w="60px" h="60px" borderRadius="30px" overflow="hidden">
        <ProfileImage iconId={2} width={60} height={60} />
      </Box>
      <VStack gap="8px" justify="center">
        <Text textStyle="h2" fontWeight="700">
          2977583581284160
        </Text>
        <Text textStyle="h3" fontWeight="400" color="gray600">
          #KR1
        </Text>
        <HStack gap="8px">
          <TierImage tier="grandmaster" width={28} height={28} />
          <Text textStyle="h3" fontWeight="700">
            GM
          </Text>
          <Text textStyle="h3" fontWeight="400" color="gray500">
            {(1200).toLocaleString('ko-KR')}LP
          </Text>
        </HStack>
        <VStack w="180px" gap="12px" p="20px 0 0 0" borderTop="1px solid" borderColor="gray300">
          <HStack gap="8px">
            <Text textStyle="h3" fontWeight="400">
              16게임
            </Text>
            <Text textStyle="h3" fontWeight="700" color="green800">
              69%
            </Text>
          </HStack>
          <HStack gap="12px">
            <ChampionIcon championEnName="fizz" width={32} height={32} radius={16} />
            <ChampionIcon championEnName="camille" width={32} height={32} radius={16} />
            <ChampionIcon championEnName="zed" width={32} height={32} radius={16} />
          </HStack>
        </VStack>
      </VStack>
      <Button
        w="180px"
        h="40px"
        borderRadius="4px"
        p="10px 12px"
        gap="8px"
        bgColor="main"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text textStyle="t2" fontWeight="400">
          소환사 추천하기
        </Text>
        <Like width="20px" height="20px" stroke="#fff" />
      </Button>
    </VStack>
  );
};

export default SummonerCard;
