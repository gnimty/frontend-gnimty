import { Box, Center, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Fragment } from 'react';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import championSkillsQuery from '@/apis/queries/championSkillsQuery';
import type { ParticipantDto } from '@/apis/types';
import skillIconUrl from '@/apis/utils/skillIconUrl';
import NextIcon from '@/assets/icons/system/next.svg';
import PerkImage from '@/components/common/PerkImage';
import PerkStyleImage, { perkStyleIdColorMap } from '@/components/common/PerkStyleImage';
import StatPerkImage from '@/components/common/StatPerkImage';

interface MatchHistoryCardExpandBuildProps {
  participant: ParticipantDto;
}

function MatchHistoryCardExpandBuild({ participant }: MatchHistoryCardExpandBuildProps) {
  const theme = useTheme();
  const { skillBuilds, championId } = participant;
  const championEnName = championIdEnNameMap[championId];
  const { data: skillData } = useQuery(championSkillsQuery({ championEnName }));
  const skillIconIds = skillData?.data[championEnName].spells.map((spell) => spell.id);
  const skillMaxRanks = skillData?.data[championEnName].spells.map((spell) => spell.maxrank);
  const skillMap: Record<number, string> = { 1: 'Q', 2: 'W', 3: 'E', 4: 'R' };
  const skillOrderAndLastSkillIndex = skillMaxRanks && getSkillOrderAndLastSkillIndex(skillBuilds, skillMaxRanks);
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
    <Flex direction="column" gap="8px">
      <Flex w="full" direction="column" bg="white">
        <Flex textStyle="t1" fontWeight={700} color="gray700" p="12px 24px">
          룬 빌드
        </Flex>
        <Flex borderTop="1px solid" borderTopColor="gray200" p="24px" gap="40px">
          {participant.perks.styles.map((perkStyle) => (
            <Flex key={perkStyle.style} gap="24px">
              <Center
                w="40px"
                h="40px"
                borderRadius="full"
                border="1px solid"
                borderColor={perkStyleIdColorMap[perkStyle.style]}
              >
                <PerkStyleImage perkStyleId={perkStyle.style} width={40} height={40} />
              </Center>
              <Center gap="12px">
                {perkStyle.selections.map((perk) => (
                  <PerkImage key={perk.perk} perkId={perk.perk} width={40} height={40} />
                ))}
              </Center>
            </Flex>
          ))}
          <HStack gap="12px">
            <StatPerkImage statPerkId={participant.perks.statPerks.offense} width={32} height={32} />
            <StatPerkImage statPerkId={participant.perks.statPerks.flex} width={32} height={32} />
            <StatPerkImage statPerkId={participant.perks.statPerks.defense} width={32} height={32} />
          </HStack>
        </Flex>
      </Flex>
      <Flex w="full" direction="column" bg="white">
        <Flex textStyle="t1" fontWeight={700} color="gray700" p="12px 24px">
          스킬 빌드
        </Flex>
        <VStack w="full" p="24px" gap="24px" align="flex-start" borderTop="1px solid" borderTopColor="gray200">
          {/* 마스터 순서 */}
          <HStack gap="4px">
            {skillOrderAndLastSkillIndex?.skillOrder.map((skill, index, currentArray) => {
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
          {/* 스킬 찍은 순서 */}
          <HStack gap="4px">
            {skillOrderAndLastSkillIndex &&
              skillBuilds.map((skill, index, currentArray) => {
                const isLastSkill =
                  index === currentArray.lastIndexOf(skill) &&
                  skillOrderAndLastSkillIndex.skillLevelsAtEnd[skill] === skillMaxRanks[skill - 1];
                return (
                  <Box
                    key={index}
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
                );
              })}
          </HStack>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default MatchHistoryCardExpandBuild;

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
