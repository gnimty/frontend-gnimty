import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import type { PerkStyleStat } from '@/apis/types';
import PerkImage from '@/components/common/PerkImage';
import PerkStyleImage from '@/components/common/PerkStyleImage';
import StatPerkImage from '@/components/common/StatPerkImage';

interface RunesProps {
  perkBuilds?: PerkStyleStat[];
}

export default function Runes({ perkBuilds }: RunesProps) {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <VStack w="full" borderRadius="4px" bg="white" gap="0">
      <Box w="full" h="52px" p="16px 20px" borderBottom="1px solid" borderColor="gray200">
        <Text textStyle="t2" fontWeight="700">
          룬
        </Text>
      </Box>
      {/* Rune Tab */}
      <HStack w="full" h="102px">
        {perkBuilds?.map((perkBuild, index) => {
          return (
            <VStack
              key={perkBuild.mainStyleId}
              w="50%"
              h="full"
              bg={tabIndex === index ? 'white' : 'gray100'}
              justify="center"
              align="center"
              gap="8px"
              cursor="pointer"
              onClick={() => setTabIndex(index)}
            >
              <HStack gap="4px">
                <Perk type="main" perkStyleId={perkBuild.mainStyleId} />
                <Perk type="sub" perkStyleId={perkBuild.subStyleId} />
              </HStack>
              <HStack gap="8px">
                <Text textStyle="t1" fontWeight="700" color="blue800">
                  {(perkBuild.winRate * 100).toFixed(2)}%
                </Text>
                <Text textStyle="body" fontWeight="400" color="gray500">
                  {perkBuild.plays.toLocaleString('ko-KR')}게임
                </Text>
              </HStack>
            </VStack>
          );
        })}
      </HStack>
      {/* Rune Page */}
      {perkBuilds?.map((perkBuild) => {
        return <RunePage key={perkBuild.mainStyleId} perkBuild={perkBuild} />;
      })}
    </VStack>
  );
}

interface PerkProps {
  type: 'main' | 'sub';
  perkStyleId: number;
}

function Perk({ type, perkStyleId }: PerkProps) {
  return (
    <Box
      w="40px"
      h="40px"
      overflow="hidden"
      borderRadius={type === 'main' ? '' : '20px'}
      bg={type === 'main' ? '' : 'gray200'}
    >
      <PerkStyleImage width="40px" height="40px" perkStyleId={perkStyleId} />
    </Box>
  );
}

interface RunePageProps {
  perkBuild: PerkStyleStat;
}

function RunePage({ perkBuild }: RunePageProps) {
  return (
    <VStack w="full" h="444px" p="40px" gap="12px">
      <HStack w="full" h="364px" gap="20px" justify="space-between">
        {/* 메인 */}
        <VStack w="full" h="full" gap="24px">
          <VStack w="60px" h="88px" gap="8px">
            <PerkStyleImage perkStyleId={perkBuild.mainStyleId} width="60px" height="60px" />
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
              룬파편
            </Text>
          </VStack>
          {/* 파편 - 공격 */}
          <VStack w="252px" gap="20px">
            <HStack w="184px" gap="20px" justify="space-between">
              <StatPerkImage statPerkId={5008} width="48" height="48" />
              <StatPerkImage statPerkId={5005} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
              <StatPerkImage statPerkId={5007} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
            </HStack>
            {/* 파편 - 유연 */}
            <HStack w="184px" gap="20px" justify="space-between">
              <StatPerkImage statPerkId={5008} width="48" height="48" />
              <StatPerkImage statPerkId={5002} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
              <StatPerkImage statPerkId={5003} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
            </HStack>
            {/* 파편 - 방어 */}
            <HStack w="184px" gap="20px" justify="space-between">
              <StatPerkImage statPerkId={5001} width="48" height="48" />
              <StatPerkImage statPerkId={5002} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
              <StatPerkImage statPerkId={5003} width="48" height="48" style={{ filter: 'grayscale(100%)' }} />
            </HStack>
          </VStack>
        </VStack>
      </HStack>
    </VStack>
  );
}
