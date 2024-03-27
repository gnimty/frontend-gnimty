import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import Image from 'next/image';
import { Fragment } from 'react';

import type { SkillComponentStat } from '@/apis/types';
import skillIconUrl from '@/apis/utils/skillIconUrl';
import NextIcon from '@/assets/icons/system/next.svg';

interface SkillBuildProps {
  skillBuilds?: SkillComponentStat[];
  skillData?: { id: string; maxrank: number }[];
}

export default function SkillBuild({ skillBuilds, skillData }: SkillBuildProps) {
  const theme = useTheme();
  const skillIconIds = skillData?.map((spell) => spell.id);
  const skillMaxRanks = skillData?.map((spell) => spell.maxrank);
  const skillMap: Record<number, string> = { 1: 'Q', 2: 'W', 3: 'E', 4: 'R' };
  const colorSwitch = (qwer: string) => {
    switch (qwer) {
      case 'Q':
        return theme.colors.blue800;
      case 'W':
        return theme.colors.teal800;
      case 'E':
        return theme.colors.orange800;
      default:
        return theme.colors.white;
    }
  };
  return (
    <VStack w="full" borderRadius="4px" bg="white">
      <Box w="full" h="54px" p="16px 20px" borderBottom="1px solid" borderColor="gray200">
        <Text textStyle="t2" fontWeight="700">
          스킬 빌드
        </Text>
      </Box>
      {skillMaxRanks &&
        skillBuilds?.map((skillBuild) => {
          const { skillOrder, skillLevelsAtEnd } = getSkillOrderAndLastSkillIndex(skillBuild.skillTree, skillMaxRanks);
          return (
            <HStack key={skillBuild.plays} w="full" h="92px" p="20px" justify="space-between">
              <HStack gap="24px">
                <HStack gap="4px">
                  {skillOrder.map((skill, index, currentArray) => {
                    if (!skillIconIds) return;
                    if (!skillIconIds[skill - 1]) return;
                    return (
                      <Fragment key={skill}>
                        <Box w="52px" h="52px" borderRadius="4px" overflow="hidden" position="relative">
                          <Image
                            src={skillIconUrl(skillIconIds[skill - 1])}
                            alt={skillIconIds[skill - 1]}
                            width="52"
                            height="52"
                          />
                          <Box
                            w="24px"
                            h="24px"
                            borderRadius="4px"
                            p="4px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            position="absolute"
                            bottom="0"
                            right="0"
                            bgColor="gray800"
                          >
                            <Text textStyle="body" fontWeight="700" color={colorSwitch(skillMap[skill])}>
                              {skillMap[skill]}
                            </Text>
                          </Box>
                        </Box>
                        {index !== currentArray.length - 1 && <NextIcon width="16px" height="16px" />}
                      </Fragment>
                    );
                  })}
                </HStack>
                <HStack gap="4px">
                  {skillBuild.skillTree.map((skill, index, currentArray) => {
                    const isLastSkill =
                      index === currentArray.lastIndexOf(skill) && skillLevelsAtEnd[skill] === skillMaxRanks[skill - 1];
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

const getSkillOrderAndLastSkillIndex = (skillTree: number[], maxRanks: number[]) => {
  const skillLevels: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  const skillOrder: number[] = [];
  const skillLevelsAtEnd: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };

  skillTree.forEach((skill) => {
    skillLevels[skill]++;
    if (skillLevels[skill] === maxRanks[skill - 1]) {
      skillOrder.push(skill);
    }
    skillLevelsAtEnd[skill] = skillLevels[skill];
  });

  const skillsAtEnd = Object.entries(skillLevelsAtEnd)
    .filter(([skill, level]) => level !== maxRanks[Number(skill) - 1])
    .sort((a, b) => b[1] - a[1]);

  skillsAtEnd.forEach(([skill]) => skillOrder.push(Number(skill)));

  return { skillOrder, skillLevelsAtEnd };
};
