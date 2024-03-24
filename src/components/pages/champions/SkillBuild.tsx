import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import Image from 'next/image';
import { Fragment } from 'react';

import type { SkillComponentStat } from '@/apis/types';
import skillIconUrl from '@/apis/utils/skillIconUrl';
import NextIcon from '@/assets/icons/system/next.svg';

interface SkillBuildProps {
  skillBuilds?: SkillComponentStat[];
  spells?: Record<string, string>[];
  isAphelios?: boolean;
}

export default function SkillBuild({ skillBuilds, spells, isAphelios }: SkillBuildProps) {
  const theme = useTheme();
  const skillIconIds = spells?.map((spell) => spell.id);
  return (
    <VStack w="full" borderRadius="4px" bg="white">
      <Box w="full" h="54px" p="16px 20px" borderBottom="1px solid" borderColor="gray200">
        <Text textStyle="t2" fontWeight="700">
          스킬 빌드
        </Text>
      </Box>
      {skillBuilds?.map((skillBuild) => {
        const { skillOrder, lastSkillIndex, skillLevelsAtEnd } = getSkillOrderAndLastSkillIndex(
          skillBuild.skillTree,
          isAphelios,
        );
        return (
          <HStack key={skillBuild.plays} w="full" h="92px" p="20px" justify="space-between">
            <HStack gap="24px">
              <HStack gap="4px">
                {skillOrder.map((skill, index) => {
                  if (!skillIconIds) return;
                  if (!skillIconIds[index]) return;
                  return (
                    <Fragment key={skill}>
                      <Box w="52px" h="52px" borderRadius="4px" overflow="hidden">
                        <Image
                          src={skillIconUrl(skillIconIds[index])}
                          alt={skillIconIds[index]}
                          width="52"
                          height="52"
                        />
                      </Box>
                      {index < skillOrder.length - 1 && <NextIcon width="20px" height="20px" />}
                    </Fragment>
                  );
                })}
              </HStack>
              <HStack gap="4px">
                {skillBuild.skillTree.map((skill, index) => {
                  const skillMap: Record<number, string> = { 1: 'q', 2: 'w', 3: 'e', 4: 'r' };
                  const maxLevels: Record<number, number> = isAphelios
                    ? { 1: 6, 2: 6, 3: 6 }
                    : { 1: 5, 2: 5, 3: 5, 4: 3 };
                  const isLastSkill = index === lastSkillIndex[skill] && skillLevelsAtEnd[skill] === maxLevels[skill];
                  const colorSwitch = (qwer: string) => {
                    switch (qwer) {
                      case 'q':
                        return theme.colors.blue800;
                      case 'w':
                        return theme.colors.teal800;
                      case 'e':
                        return theme.colors.orange800;
                      default:
                        return theme.colors.white;
                    }
                  };
                  return (
                    <VStack key={index} gap="4px">
                      <Box
                        w="24px"
                        h="24px"
                        borderRadius="4px"
                        p="4px"
                        bgColor="gray200"
                        textStyle="t2"
                        fontWeight="400"
                        textAlign="center"
                        color="gray700"
                      >
                        {index + 1}
                      </Box>
                      <Box
                        w="24px"
                        h="24px"
                        borderRadius="4px"
                        bgColor={skill === 4 ? 'gray800' : isLastSkill ? colorSwitch(skillMap[skill]) : 'gray800'}
                        textStyle="t2"
                        fontWeight="700"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        color={skill === 4 ? 'white' : isLastSkill ? 'white' : colorSwitch(skillMap[skill])}
                      >
                        {skillMap[skill]}
                      </Box>
                    </VStack>
                  );
                })}
              </HStack>
            </HStack>
            <HStack gap="8px" align="center">
              <Text textStyle="t1" fontWeight="700" color="blue800">
                {(skillBuild.winRate * 100).toFixed(2)}%
              </Text>
              <Text textStyle="body" fontWeight="400" color="gray600">
                {skillBuild.plays.toLocaleString('ko-KR')}게임
              </Text>
            </HStack>
          </HStack>
        );
      })}
    </VStack>
  );
}

// TODO: 궁극기의 경우에 대해 항상 마지막에 위치하는 문제에 대한 논의
const getSkillOrderAndLastSkillIndex = (skillTree: number[], isAphelios?: boolean) => {
  const skillLevels: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  const lastSkillIndex: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  const skillOrder: number[] = [];
  const maxLevels: Record<number, number> = isAphelios ? { 1: 6, 2: 6, 3: 6 } : { 1: 5, 2: 5, 3: 5, 4: 3 };

  skillTree.forEach((skill, index) => {
    skillLevels[skill]++;

    lastSkillIndex[skill] = index;
    if (skillLevels[skill] === maxLevels[skill]) {
      skillOrder.push(skill);
    }
  });

  const remainingSkillsWithSkillLevel = Object.entries(skillLevels).filter(
    ([skill, level]) => level < maxLevels[parseInt(skill, 10)],
  );

  if (remainingSkillsWithSkillLevel.length === 3) {
    skillOrder.push(4);
  }

  remainingSkillsWithSkillLevel
    .toSorted((a, b) => b[1] - a[1])
    .forEach(([skill]) => {
      skillOrder.push(parseInt(skill, 10));
    });

  return { skillOrder, lastSkillIndex, skillLevelsAtEnd: skillLevels };
};
