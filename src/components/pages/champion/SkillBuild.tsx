import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import Image from 'next/image';

import championIconUrl from '@/apis/utils/championIconUrl';
import NextIcon from '@/assets/icons/system/next.svg';

export default function SkillBuild() {
  const theme = useTheme();
  return (
    <VStack w="full" borderRadius="4px" bg="white">
      <Box w="full" h="54px" p="16px 20px" borderBottom="1px solid" borderColor="gray200">
        <Text textStyle="t2" fontWeight="700">
          스킬 빌드
        </Text>
      </Box>
      <HStack w="full" h="92px" p="20px" justify="space-between">
        <HStack gap="24px">
          <HStack gap="4px">
            <Box w="52px" h="52px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Aatrox')} alt="아트록스, 임시" width="52" height="52" />
            </Box>
            <NextIcon width="20px" height="20px" />
            <Box w="52px" h="52px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Aatrox')} alt="아트록스, 임시" width="52" height="52" />
            </Box>
            <NextIcon width="20px" height="20px" />
            <Box w="52px" h="52px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Aatrox')} alt="아트록스, 임시" width="52" height="52" />
            </Box>
            <NextIcon width="20px" height="20px" />
            <Box w="52px" h="52px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Aatrox')} alt="아트록스, 임시" width="52" height="52" />
            </Box>
          </HStack>
          <HStack gap="4px">
            {['q', 'e', 'w', 'q', 'q', 'r', 'q', 'e', 'q', 'e', 'r', 'e', 'e', 'w', 'w', 'r', 'w', 'w'].map(
              (skill, index, currentArray) => {
                // array에서 현재 index에 해당하는 q, w, e, r이 뒤에 더 이상 없는지 확인
                const isLastSkill = index === currentArray.lastIndexOf(skill);
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
                      bgColor={skill === 'r' ? 'gray800' : isLastSkill ? colorSwitch(skill) : 'gray800'}
                      textStyle="t2"
                      fontWeight="700"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      color={skill === 'r' ? 'white' : isLastSkill ? 'white' : colorSwitch(skill)}
                    >
                      {skill.toUpperCase()}
                    </Box>
                  </VStack>
                );
              },
            )}
          </HStack>
        </HStack>
        <HStack gap="8px" align="center">
          <Text textStyle="t1" fontWeight="700" color="blue800">
            70%
          </Text>
          <Text textStyle="body" fontWeight="400" color="gray600">
            12,312게임
          </Text>
          H
        </HStack>
      </HStack>
      <HStack w="full" h="92px" p="20px" justify="space-between">
        <HStack gap="24px">
          <HStack gap="4px">
            <Box w="52px" h="52px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Aatrox')} alt="아트록스, 임시" width="52" height="52" />
            </Box>
            <NextIcon width="20px" height="20px" />
            <Box w="52px" h="52px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Aatrox')} alt="아트록스, 임시" width="52" height="52" />
            </Box>
            <NextIcon width="20px" height="20px" />
            <Box w="52px" h="52px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Aatrox')} alt="아트록스, 임시" width="52" height="52" />
            </Box>
            <NextIcon width="20px" height="20px" />
            <Box w="52px" h="52px" borderRadius="4px" overflow="hidden">
              <Image src={championIconUrl('Aatrox')} alt="아트록스, 임시" width="52" height="52" />
            </Box>
          </HStack>
          <HStack gap="4px">
            {['q', 'e', 'w', 'q', 'q', 'r', 'q', 'e', 'q', 'e', 'r', 'e', 'e', 'w', 'w', 'r', 'w', 'w'].map(
              (skill, index, currentArray) => {
                // array에서 현재 index에 해당하는 q, w, e, r이 뒤에 더 이상 없는지 확인
                const isLastSkill = index === currentArray.lastIndexOf(skill);
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
                      bgColor={skill === 'r' ? 'gray800' : isLastSkill ? colorSwitch(skill) : 'gray800'}
                      textStyle="t2"
                      fontWeight="700"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      color={skill === 'r' ? 'white' : isLastSkill ? 'white' : colorSwitch(skill)}
                    >
                      {skill.toUpperCase()}
                    </Box>
                  </VStack>
                );
              },
            )}
          </HStack>
        </HStack>
        <HStack gap="8px" align="center">
          <Text textStyle="t1" fontWeight="700" color="blue800">
            70%
          </Text>
          <Text textStyle="body" fontWeight="400" color="gray600">
            12,312게임
          </Text>
          H
        </HStack>
      </HStack>
    </VStack>
  );
}
