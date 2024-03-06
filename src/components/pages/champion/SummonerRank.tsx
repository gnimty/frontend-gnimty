import profileIconUrl from '@/apis/utils/profileIconUrl';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

export default function SummonerRank() {
  return (
    <VStack w="full" borderRadius="4px" bg="white">
      <Box w="full" h="52px" p="16px 20px" borderBottom="1px solid" borderColor="gray200">
        <Text textStyle="t2" fontWeight="700">
          소환사 랭킹
        </Text>
      </Box>
      <HStack
        w="full"
        h="44px"
        p="12px 20px"
        gap="12px"
        textStyle="t2"
        fontWeight="400"
        borderBottom="1px solid"
        borderColor="gray200"
      >
        <Text w="28px">순위</Text>
        <Text w="188px">소환사</Text>
        <Text w="80px" textAlign="center">
          소환사
        </Text>
        <Text w="80px" textAlign="center">
          소환사
        </Text>
      </HStack>
      <VStack w="full" pb="20px">
        <HStack w="full" p="20px 20px 0 20px" gap="12px">
          <Text w="28px" textStyle="t2" fontWeight="400">
            1
          </Text>
          <Box w="40px" h="40px" borderRadius="50%" overflow="hidden">
            <Image src={profileIconUrl(1)} alt="test" width="40" height="40" />
          </Box>
          <Text w="136px" textStyle="t2" fontWeight="700">
            스트레스유발협곡
          </Text>
          <Text w="80px" textStyle="t1" fontWeight="700" color="blue800">
            70%
          </Text>
          <Text w="80px" textStyle="body" fontWeight="400" color="gray600">
            12,312게임
          </Text>
        </HStack>
        <HStack w="full" p="20px 20px 0 20px" gap="12px">
          <Text w="28px" textStyle="t2" fontWeight="400">
            2
          </Text>
          <Box w="40px" h="40px" borderRadius="50%" overflow="hidden">
            <Image src={profileIconUrl(1)} alt="test" width="40" height="40" />
          </Box>
          <Text w="136px" textStyle="t2" fontWeight="700">
            스트레스유발협곡
          </Text>
          <Text w="80px" textStyle="t1" fontWeight="700" color="blue800">
            70%
          </Text>
          <Text w="80px" textStyle="body" fontWeight="400" color="gray600">
            12,312게임
          </Text>
        </HStack>
        <HStack w="full" p="20px 20px 0 20px" gap="12px">
          <Text w="28px" textStyle="t2" fontWeight="400">
            3
          </Text>
          <Box w="40px" h="40px" borderRadius="50%" overflow="hidden">
            <Image src={profileIconUrl(1)} alt="test" width="40" height="40" />
          </Box>
          <Text w="136px" textStyle="t2" fontWeight="700">
            스트레스유발협곡
          </Text>
          <Text w="80px" textStyle="t1" fontWeight="700" color="blue800">
            70%
          </Text>
          <Text w="80px" textStyle="body" fontWeight="400" color="gray600">
            12,312게임
          </Text>
        </HStack>
        <HStack w="full" p="20px 20px 0 20px" gap="12px">
          <Text w="28px" textStyle="t2" fontWeight="400">
            4
          </Text>
          <Box w="40px" h="40px" borderRadius="50%" overflow="hidden">
            <Image src={profileIconUrl(1)} alt="test" width="40" height="40" />
          </Box>
          <Text w="136px" textStyle="t2" fontWeight="700">
            스트레스유발협곡
          </Text>
          <Text w="80px" textStyle="t1" fontWeight="700" color="blue800">
            70%
          </Text>
          <Text w="80px" textStyle="body" fontWeight="400" color="gray600">
            12,312게임
          </Text>
        </HStack>
        <HStack w="full" p="20px 20px 0 20px" gap="12px">
          <Text w="28px" textStyle="t2" fontWeight="400">
            5
          </Text>
          <Box w="40px" h="40px" borderRadius="50%" overflow="hidden">
            <Image src={profileIconUrl(1)} alt="test" width="40" height="40" />
          </Box>
          <Text w="136px" textStyle="t2" fontWeight="700">
            스트레스유발협곡
          </Text>
          <Text w="80px" textStyle="t1" fontWeight="700" color="blue800">
            70%
          </Text>
          <Text w="80px" textStyle="body" fontWeight="400" color="gray600">
            12,312게임
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}
