import PerkImage from '@/components/common/PerkImage';
import PerkStatImage from '@/components/common/PerkStatImage';
import PerkStyleImage from '@/components/common/PerkStyleImage';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';

export default function Runes() {
  return (
    <VStack w="full" borderRadius="4px" bg="white">
      <Box w="full" h="52px" p="16px 20px" borderBottom="1px solid" borderColor="gray200">
        <Text textStyle="t2" fontWeight="700">
          룬
        </Text>
      </Box>
      <RunePage />
      <RunePage />
    </VStack>
  );
}

function RunePage() {
  return (
    <VStack w="full" h="558px" p="40px" gap="12px">
      <VStack w="full" h="102px" p="16px 20px" gap="8px">
        <HStack w="84px" h="40px" gap="4px" align="center">
          <PerkStyleImage perkStyleId={8000} width="40px" height="40px" />
          <PerkStyleImage perkStyleId={8100} width="40px" height="40px" />
        </HStack>
        <HStack w="100px" gap="8px">
          <Text textStyle="t1" fontWeight="700" color="blue800">
            56%
          </Text>
          <Text textStyle="body" fontWeight="400" color="gray500">
            12,132게임
          </Text>
        </HStack>
      </VStack>
      <HStack w="full" h="364px" gap="20px" justify="space-between">
        {/* 메인 */}
        <VStack w="full" h="full" gap="24px">
          <VStack w="60px" h="88px" gap="8px">
            <PerkStyleImage perkStyleId={8000} width="60px" height="60px" />
            <Text textStyle="t2" fontWeight="400" color="gray700">
              정밀
            </Text>
          </VStack>
          <VStack w="252px" gap="20px">
            <HStack w="full" gap="20px" justify="space-between">
              <PerkImage perkId={8112} width="48" height="48" />
              <PerkImage perkId={8112} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
              <PerkImage perkId={8112} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
              <PerkImage perkId={8112} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
            </HStack>
            <HStack w="184px" gap="20px" justify="space-between">
              <PerkImage perkId={8112} width="48" height="48" />
              <PerkImage perkId={8112} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
              <PerkImage perkId={8112} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
            </HStack>
            <HStack w="184px" gap="20px" justify="space-between">
              <PerkImage perkId={8112} width="48" height="48" />
              <PerkImage perkId={8112} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
              <PerkImage perkId={8112} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
            </HStack>
            <HStack w="184px" gap="20px" justify="space-between">
              <PerkImage perkId={8112} width="48" height="48" />
              <PerkImage perkId={8112} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
              <PerkImage perkId={8112} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
            </HStack>
          </VStack>
        </VStack>
        {/* 서브 */}
        <VStack w="full" h="full" gap="24px" justify="space-between">
          <VStack w="60px" h="88px" gap="8px">
            <PerkStyleImage perkStyleId={8100} width="60px" height="60px" />
            <Text textStyle="t2" fontWeight="400" color="gray700">
              지배
            </Text>
          </VStack>
          <VStack w="252px" gap="20px">
            <HStack w="184px" gap="20px" justify="space-between">
              <PerkImage perkId={8112} width="48" height="48" />
              <PerkImage perkId={8112} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
              <PerkImage perkId={8112} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
            </HStack>
            <HStack w="184px" gap="20px" justify="space-between">
              <PerkImage perkId={8112} width="48" height="48" />
              <PerkImage perkId={8112} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
              <PerkImage perkId={8112} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
            </HStack>
            <HStack w="184px" gap="20px" justify="space-between">
              <PerkImage perkId={8112} width="48" height="48" />
              <PerkImage perkId={8112} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
              <PerkImage perkId={8112} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
            </HStack>
          </VStack>
        </VStack>
        {/* 파편 */}
        <VStack w="full" h="full" gap="24px" justify="space-between">
          <VStack w="60px" h="88px" gap="8px" justify="center">
            <Text textStyle="t2" fontWeight="400" color="gray700">
              룬 파편
            </Text>
          </VStack>
          {/* 파편 - 공격 */}
          <VStack w="252px" gap="20px">
            <HStack w="184px" gap="20px" justify="space-between">
              <PerkStatImage perkStatId={5008} width="48" height="48" />
              <PerkStatImage perkStatId={5005} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
              <PerkStatImage perkStatId={5007} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
            </HStack>
            {/* 파편 - 유연 */}
            <HStack w="184px" gap="20px" justify="space-between">
              <PerkStatImage perkStatId={5008} width="48" height="48" />
              <PerkStatImage perkStatId={5002} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
              <PerkStatImage perkStatId={5003} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
            </HStack>
            {/* 파편 - 방어 */}
            <HStack w="184px" gap="20px" justify="space-between">
              <PerkStatImage perkStatId={5001} width="48" height="48" />
              <PerkStatImage perkStatId={5002} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
              <PerkStatImage perkStatId={5003} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
            </HStack>
          </VStack>
        </VStack>
      </HStack>
    </VStack>
  );
}
