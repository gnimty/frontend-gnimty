import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { perkMap, perkNameMap } from '@/apis/constants/perkMap';
import { shards } from '@/apis/constants/shards';
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
      <HStack w="full" h="102px" gap="0">
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
                <Perk type="main" perkStyleId={perkBuild.primaryStyleId} />
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
      {perkBuilds?.map((perkBuild, index) => {
        return <RunePage key={perkBuild.mainStyleId} perkBuild={perkBuild} show={tabIndex === index} />;
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
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <PerkStyleImage
        width={type === 'main' ? '40px' : '32px'}
        height={type === 'main' ? '40px' : '32px'}
        perkStyleId={perkStyleId}
      />
    </Box>
  );
}

interface RunePageProps {
  perkBuild: PerkStyleStat;
  show: boolean;
}

function RunePage({ perkBuild, show }: RunePageProps) {
  return (
    <VStack w="full" h="444px" p="40px" gap="12px" display={show ? 'block' : 'none'}>
      <HStack w="full" h="364px" gap="20px" justify="space-between">
        {/* 메인 */}
        <VStack w="full" h="full" gap="24px">
          <VStack w="60px" h="88px" gap="8px">
            <PerkStyleImage perkStyleId={perkBuild.primaryStyleId} width="60px" height="60px" />
            <Text textStyle="t2" fontWeight="400" color="gray700">
              {perkNameMap[perkBuild.primaryStyleId as keyof typeof perkNameMap]}
            </Text>
          </VStack>
          <VStack w="252px" gap="20px">
            <HStack w="full" gap="20px" justify="space-between">
              {perkMap[perkBuild.primaryStyleId as keyof typeof perkMap][0].map((perkId) => (
                // TODO: primary image의 경우 배경이 없음
                <PerkImage
                  key={perkId}
                  perkId={perkId}
                  width="48"
                  height="48"
                  style={{ filter: perkId === perkBuild.primaryStyles[0] ? '' : 'grayscale(100%)' }}
                />
              ))}
            </HStack>
            <HStack minW="184px" gap="20px" justify="space-between">
              {perkMap[perkBuild.primaryStyleId as keyof typeof perkMap][1].map((perkId) => (
                <PerkImage
                  key={perkId}
                  perkId={perkId}
                  width="48"
                  height="48"
                  style={{ filter: perkId === perkBuild.primaryStyles[1] ? '' : 'grayscale(100%)' }}
                />
              ))}
            </HStack>
            <HStack minW="184px" gap="20px" justify="space-between">
              {perkMap[perkBuild.primaryStyleId as keyof typeof perkMap][2].map((perkId) => (
                <PerkImage
                  key={perkId}
                  perkId={perkId}
                  width="48"
                  height="48"
                  style={{ filter: perkId === perkBuild.primaryStyles[2] ? '' : 'grayscale(100%)' }}
                />
              ))}
            </HStack>
            <HStack minW="184px" gap="20px" justify="space-between">
              {perkMap[perkBuild.primaryStyleId as keyof typeof perkMap][3].map((perkId) => (
                <PerkImage
                  key={perkId}
                  perkId={perkId}
                  width="48"
                  height="48"
                  style={{ filter: perkId === perkBuild.primaryStyles[3] ? '' : 'grayscale(100%)' }}
                />
              ))}
            </HStack>
          </VStack>
        </VStack>
        {/* 서브 */}
        <VStack w="full" h="full" gap="24px" justify="space-between">
          <VStack w="60px" h="88px" gap="8px">
            <PerkStyleImage perkStyleId={perkBuild.subStyleId} width="60px" height="60px" />
            <Text textStyle="t2" fontWeight="400" color="gray700">
              {perkNameMap[perkBuild.subStyleId as keyof typeof perkNameMap]}
            </Text>
          </VStack>
          <VStack w="252px" gap="20px">
            <HStack minW="184px" gap="20px" justify="space-between">
              {perkMap[perkBuild.subStyleId as keyof typeof perkMap][1].map((perkId) => (
                <PerkImage
                  key={perkId}
                  perkId={perkId}
                  width="48"
                  height="48"
                  style={{ filter: perkBuild.subStyles.includes(perkId) ? '' : 'grayscale(100%)' }}
                />
              ))}
            </HStack>
            <HStack minW="184px" gap="20px" justify="space-between">
              {perkMap[perkBuild.subStyleId as keyof typeof perkMap][2].map((perkId) => (
                <PerkImage
                  key={perkId}
                  perkId={perkId}
                  width="48"
                  height="48"
                  style={{ filter: perkBuild.subStyles.includes(perkId) ? '' : 'grayscale(100%)' }}
                />
              ))}
            </HStack>
            <HStack minW="184px" gap="20px" justify="space-between">
              {perkMap[perkBuild.subStyleId as keyof typeof perkMap][3].map((perkId) => (
                <PerkImage
                  key={perkId}
                  perkId={perkId}
                  width="48"
                  height="48"
                  style={{ filter: perkBuild.subStyles.includes(perkId) ? '' : 'grayscale(100%)' }}
                />
              ))}
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
            {shards.map((shardRow, shardRowIndex) => (
              <HStack key={shardRowIndex} w="184px" gap="20px" justify="space-between">
                {shardRow.map((shardId) => (
                  <StatPerkImage
                    key={shardId}
                    statPerkId={shardId}
                    width={48}
                    height={48}
                    // TODO: statPerks 순서 바뀌면 변경
                    style={{
                      filter: shardId === perkBuild.statPerks.toReversed()[shardRowIndex] ? '' : 'grayscale(100%)',
                    }}
                  />
                ))}
              </HStack>
            ))}
          </VStack>
        </VStack>
      </HStack>
    </VStack>
  );
}
