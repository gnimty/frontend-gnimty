import { VStack, HStack, Box, Text, Divider, Button } from '@chakra-ui/react';
import Image from 'next/image';
import TierImage from '@/components/common/TierImage';
import profileIconUrl from '@/apis/utils/profileIconUrl';

function Reply() {
  return (
    <VStack w="full" align="flex-start" gap="12px">
      <HStack w="full" justify="space-between">
        <HStack h="24px" gap="12px" align="center">
          <Box w="24px" h="24px" overflow="hidden" borderRadius="12px">
            <Image src={profileIconUrl(1)} width="24" height="24" alt="profileIcon" />
          </Box>
          <Text textStyle="t2" fontWeight="700">
            KT DEFT
          </Text>
          <HStack gap="4px" align="center">
            <TierImage tier="challenger" width="24" />
            <Text textStyle="t2" fontWeight="400">
              Challenger
            </Text>
          </HStack>
          <Divider orientation="vertical" h="full" colorScheme="gray500" />
          <Text textStyle="body" fontWeight="400" color="gray500">
            2일전
          </Text>
        </HStack>
        <HStack h="24px" gap="8px">
          <Text textStyle="body" fontWeight="400" color="gray500">
            신고
          </Text>
        </HStack>
      </HStack>
      <Box w="full" textStyle="t2" fontWeight="400">
        이게 크산테다 체력 4700 방어력 329 마저201인 챔피언👤이 저지불가🚫, 실드🛡, 벽🧱 넘기는 거 있고요. 에어본🌪
        있고, 심지어 쿨타임은 1️⃣초밖에 안되고 마나🧙‍♂️는 1️⃣5️⃣ 들고 w는 심지어 변신💫하면 쿨 초기화에다가 패시브는
        고정피해🗡가 들어가며 그 다음에 방마저🥋 올리면📈 올릴수록📈 스킬 가속⏰이 생기고! q에 스킬가속⏰이 생기고 스킬
        속도🚀가 빨라지고📈 그 다음에 공격력🗡 계수가 있어가지고 W가 그 이익- 으아아아악😱😱
      </Box>
      <HStack w="full" justify="space-between">
        <HStack gap="12px">
          <Button borderBottom="1px solid" borderColor="gray600" borderRadius="0">
            <Text textStyle="t2" fontWeight="400" color="gray600">
              답글달기
            </Text>
          </Button>
        </HStack>
        <HStack gap="8px">
          <HStack
            borderRadius="999px"
            p="4px 8px"
            color="gray600"
            border="1px solid"
            borderColor="gray400"
            textStyle="body"
            gap="4px"
          >
            <Text fontWeight="400">추천</Text>
            <Text fontWeight="700">1</Text>
          </HStack>
          <HStack
            borderRadius="999px"
            p="4px 8px"
            color="gray600"
            border="1px solid"
            borderColor="gray400"
            textStyle="body"
            gap="4px"
          >
            <Text fontWeight="400">비추천</Text>
            <Text fontWeight="700">1</Text>
          </HStack>
        </HStack>
      </HStack>
    </VStack>
  );
}

export default function Replies() {
  return (
    <VStack w="full">
      <VStack w="full" p="20px" gap="24px" bgColor="gray100">
        {Array.from({ length: 2 }).map((_, index) => (
          <Reply key={index} />
        ))}
      </VStack>
    </VStack>
  );
}
