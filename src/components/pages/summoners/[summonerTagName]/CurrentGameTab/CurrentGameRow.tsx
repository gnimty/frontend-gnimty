import { Box, Center, Flex, HStack, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import Image from 'next/image';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import championIdKrNameMap from '@/apis/constants/championIdKrNameMap';
import type { CurrentGameParticipantDto } from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';
import fullTierName from '@/apis/utils/fullTierName';
import PerkImage from '@/components/common/PerkImage';
import PerkStyleImage, { perkStyleIdColorMap } from '@/components/common/PerkStyleImage';
import SpellImage from '@/components/common/SpellImage';
import StatPerkImage from '@/components/common/StatPerkImage';
import TierImage from '@/components/common/TierImage';

interface CurrentGameRowProps {
  team: 'red' | 'blue';
  participants: CurrentGameParticipantDto[];
}

export default function CurrentGameRow(props: CurrentGameRowProps) {
  const { team, participants } = props;
  const isReverse = team === 'red';

  return (
    <Box w="full">
      <Flex
        bg="white"
        justifyContent="space-between"
        p="8px 24px"
        borderBottom="1px"
        borderColor="gray200"
        flexDir={`row${isReverse ? '-reverse' : ''}`}
      >
        <Text textStyle="t1" fontWeight="bold" color={team === 'blue' ? 'blue800' : 'red800'}>
          {team === 'blue' ? '블루' : '레드'}팀
        </Text>
      </Flex>

      <Table w="full">
        <Thead>
          <Tr
            display="flex"
            flexDir={`row${isReverse ? '-reverse' : ''}`}
            gap="20px"
            p="12px"
            bg="white"
            textStyle="body"
            fontWeight="bold"
            color="gray600"
          >
            <Th w="100px" px="8px">
              소환사
            </Th>
            <Th w="100px" px="8px">
              챔피언 전적
            </Th>
            <Th flex="1 0 0" px="8px" textAlign={isReverse ? 'end' : 'start'} colSpan={2}>
              소환사 주문 / 룬
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {participants.map((participant) => (
            <Tr
              key={participant.summoner.puuid}
              display="flex"
              p="12px"
              gap="20px"
              flexDir={isReverse ? 'row-reverse' : 'row'}
            >
              <Td display="flex" flexDir="column" gap="2px" w="100px">
                <Flex pos="relative" flexDir="column" align="center" h="44px">
                  <Image
                    src={championIconUrl(championIdEnNameMap[participant.championId])}
                    alt={championIdKrNameMap[participant.championId]}
                    width={36}
                    height={36}
                    css={{
                      borderRadius: '999px',
                    }}
                  />
                  <Flex
                    bg="gray800"
                    borderRadius="20px"
                    px="8px"
                    textStyle="caption"
                    fontWeight="regular"
                    color="white"
                    pos="relative"
                    top="-6px"
                  >
                    <Text>{participant.summoner.summonerLevel}</Text>
                  </Flex>
                </Flex>
                <VStack gap={0}>
                  <HStack gap="4px">
                    <TierImage width={14} height={14} tier={participant.summoner.soloTierInfo.tier} />
                    <Text textStyle="caption" color="gray600" fontWeight="regular">
                      {fullTierName(participant.summoner.soloTierInfo.tier, participant.summoner.soloTierInfo.division)}
                    </Text>
                  </HStack>
                  <Text textStyle="caption" fontWeight="bold" color="gray800">
                    {participant.summoner.summonerName}
                  </Text>
                </VStack>
              </Td>
              {/* TODO: 이 부분들 API 어떻게 받아오는지 백엔드 분들께 여쭤 봐야 함 */}
              <Td display="flex" flexDir="column" gap="4px" w="100px" justifyContent="center">
                <VStack gap={0}>
                  <Text textStyle="body" fontWeight="regular" color="gray800">
                    {14} /{' '}
                    <Text as="span" color="main">
                      {3}
                    </Text>{' '}
                    / {6}
                  </Text>
                  <Text w="60px" textStyle="body" fontWeight="regular" color="main" textAlign="center">
                    {3.57} KDA
                  </Text>
                </VStack>
                <Text textStyle="body" fontWeight="regular" color="gray800" w="full" textAlign="center">
                  143 (6.2)
                </Text>
              </Td>
              <Td display="flex" flexDir="column" justifyContent="center" gap="4px">
                <SpellImage spellId={participant.spellDId} width={24} height={24} />
                <SpellImage spellId={participant.spellFId} width={24} height={24} />
              </Td>
              <Td display="flex" flexDir="column" gap="4px" justifyContent="center">
                {participant.perks.styles.map((perkStyle) => (
                  <HStack key={perkStyle.description} gap="12px">
                    <Center
                      w="24px"
                      h="24px"
                      borderRadius="full"
                      border="1px solid"
                      borderColor={perkStyleIdColorMap[perkStyle.style]}
                    >
                      <PerkStyleImage perkStyleId={perkStyle.style} width={20} height={20} />
                    </Center>
                    <HStack gap="8px">
                      {perkStyle.selections.map((perkSelection) => (
                        <PerkImage key={perkSelection.perk} perkId={perkSelection.perk} width={24} height={24} />
                      ))}
                    </HStack>
                  </HStack>
                ))}
                <HStack gap="8px">
                  <StatPerkImage statPerkId={participant.perks.statPerks.offense} width={16} height={16} />
                  <StatPerkImage statPerkId={participant.perks.statPerks.flex} width={16} height={16} />
                  <StatPerkImage statPerkId={participant.perks.statPerks.defense} width={16} height={16} />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
