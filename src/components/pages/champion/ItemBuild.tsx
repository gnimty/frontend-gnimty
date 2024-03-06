import championIconUrl from '@/apis/utils/championIconUrl';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

export default function ItemBuild() {
  return (
    <VStack w="616px" borderRadius="4px" bg="white">
      <Box w="full" h="46px" p="12px 24px" borderBottom="1px solid" borderColor="gray200">
        <Text textStyle="t2" fontWeight="700">
          아이템 빌드
        </Text>
      </Box>
      <HStack
        w="full"
        h="44px"
        p="12px 24px"
        justify="space-between"
        textStyle="t2"
        fontWeight="400"
        borderBottom="1px solid"
        borderColor="gray200"
      >
        <Text>아이템</Text>
        <HStack w="264px" gap="12px">
          <Text w="80px" textAlign="center">
            승률
          </Text>
          <Text w="80px" textAlign="center">
            픽률
          </Text>
          <Text w="80px" textAlign="center">
            플레이 수
          </Text>
        </HStack>
      </HStack>
      <VStack w="full" pb="20px">
        <HStack w="full" p="20px 20px 0 20px" justify="space-between">
          <HStack gap="8px">
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
          </HStack>
          <HStack w="256px" gap="8px">
            <Text w="80px" textStyle="t1" fontWeight="700" color="blue800">
              70%
            </Text>
            <Text w="80px" textStyle="t1" fontWeight="700" color="blue800">
              70%
            </Text>
            <Text w="80px" textStyle="body" fontWeight="400" color="gray600">
              12,312게임
            </Text>
          </HStack>
        </HStack>
        <HStack w="full" p="20px 20px 0 20px" justify="space-between">
          <HStack gap="8px">
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
          </HStack>
          <HStack w="256px" gap="8px">
            <Text w="80px" textStyle="t1" fontWeight="700" color="blue800">
              70%
            </Text>
            <Text w="80px" textStyle="t1" fontWeight="700" color="blue800">
              70%
            </Text>
            <Text w="80px" textStyle="body" fontWeight="400" color="gray600">
              12,312게임
            </Text>
          </HStack>
        </HStack>
        <HStack w="full" p="20px 20px 0 20px" justify="space-between">
          <HStack gap="8px">
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
          </HStack>
          <HStack w="256px" gap="8px">
            <Text w="80px" textStyle="t1" fontWeight="700" color="blue800">
              70%
            </Text>
            <Text w="80px" textStyle="t1" fontWeight="700" color="blue800">
              70%
            </Text>
            <Text w="80px" textStyle="body" fontWeight="400" color="gray600">
              12,312게임
            </Text>
          </HStack>
        </HStack>
        <HStack w="full" p="20px 20px 0 20px" justify="space-between">
          <HStack gap="8px">
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
          </HStack>
          <HStack w="256px" gap="8px">
            <Text w="80px" textStyle="t1" fontWeight="700" color="blue800">
              70%
            </Text>
            <Text w="80px" textStyle="t1" fontWeight="700" color="blue800">
              70%
            </Text>
            <Text w="80px" textStyle="body" fontWeight="400" color="gray600">
              12,312게임
            </Text>
          </HStack>
        </HStack>
        <HStack w="full" p="20px 20px 0 20px" justify="space-between">
          <HStack gap="8px">
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
            <Box w="40px" h="40px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Khazix')} alt="카직스, 임시" width="40" height="40" />
            </Box>
          </HStack>
          <HStack w="256px" gap="8px">
            <Text w="80px" textStyle="t1" fontWeight="700" color="blue800">
              70%
            </Text>
            <Text w="80px" textStyle="t1" fontWeight="700" color="blue800">
              70%
            </Text>
            <Text w="80px" textStyle="body" fontWeight="400" color="gray600">
              12,312게임
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
}
