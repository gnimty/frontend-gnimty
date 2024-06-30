import { Box, Center, Flex, Grid, Text } from '@chakra-ui/react';
import Link from 'next/link';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import type { ParticipantDto } from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';
import IconImage from '@/components/common/IconImage';
import ItemImage from '@/components/common/ItemImage';
import PerkImage from '@/components/common/PerkImage';
import PerkStyleImage from '@/components/common/PerkStyleImage';
import SpellImage from '@/components/common/SpellImage';
import Tag from '@/components/common/Tag';
import TierImage from '@/components/common/TierImage';

import type { FlexProps } from '@chakra-ui/react';

interface MatchHistoryCardExpandInfoPartsProps extends FlexProps {
  participant: ParticipantDto;
  isVictory: boolean;
  gameDuration: number;
  maxDamage: number;
}

function MatchHistoryCardExpandInfoParts({
  participant,
  isVictory,
  gameDuration,
  maxDamage,
  ...props
}: MatchHistoryCardExpandInfoPartsProps) {
  const color300 = isVictory ? 'blue300' : 'red300';

  const damageRatio = participant.totalDamageDealtToChampions / maxDamage;

  return (
    <Flex padding="12px" alignItems="center" bg={isVictory ? 'blue200' : 'red200'} columnGap="16px" {...props}>
      <Grid gridTemplateColumns="repeat(4, auto)" gridGap="4px" width="108px">
        {[...participant.items.slice(0, 3), participant.accessory, ...participant.items.slice(3)].map(
          (itemId, index) =>
            itemId ? (
              <ItemImage key={itemId} itemId={itemId} width={24} height={24} css={{ borderRadius: '4px' }} />
            ) : (
              <Box key={`${itemId}-${index}`} width="24px" height="24px" bg={color300} borderRadius="4px" />
            ),
        )}
      </Grid>
      <Center flexDirection="column" textStyle="body" fontWeight={400} width="60px">
        <Text>
          {participant.kill} / {participant.death} / {participant.assist}
        </Text>
        <Text color="main">{participant.kda} KDA</Text>
        <Text>
          {participant.cs} ({((participant.cs / gameDuration) * 60).toFixed(1)})
        </Text>
      </Center>
      <Center flexDirection="column" gap="4px" width="48px">
        <Text textStyle="caption" fontWeight={400} color="gray600">
          {Intl.NumberFormat().format(participant.totalDamageDealtToChampions)}
        </Text>
        <Flex w="48px" h="8px" borderRightRadius="12px">
          <Box flex={damageRatio} bg="blue800" borderLeftRadius="inherit" />
          <Box flex={1 - damageRatio} bg="gray100" borderRightRadius="inherit" />
        </Flex>
      </Center>
      <Center gap="12px" width="148px">
        <Center flexDirection="column" w="84px">
          <Box position="relative" pb="8px">
            <Link href={`/champions/${championIdEnNameMap[participant.championId]}`}>
              <IconImage
                src={championIconUrl(championIdEnNameMap[participant.championId])}
                width={36}
                height={36}
                alt="champion-icon"
              />
            </Link>
            <Tag
              type="level"
              position="absolute"
              bottom="8px"
              left="50%"
              transform="translate(-50%, 50%)"
              w="27px"
              h="14px"
            >
              {participant.totalChampionLevel}
            </Tag>
          </Box>
          <Center gap="4px">
            <TierImage tier={participant.tier} width={14} height={14} />
            <Text textStyle="caption" color="gray600">
              {participant.tier}{' '}
              {!['challenger', 'grandmaster', 'master', 'unknown'].includes(participant.tier) && participant.division}
            </Text>
          </Center>
          <Text textStyle="caption" fontWeight={700} color="gray800" noOfLines={1}>
            <Link
              href={`/summoners/${participant.summonerName}-${participant.tagLine}`}
              css={{ textDecoration: 'none', color: 'inherit' }}
            >
              {participant.internalTagName}
            </Link>
          </Text>
        </Center>
        <Grid gridTemplateColumns="1fr 1fr" gap="4px" width="fit-content" height="fit-content">
          <SpellImage spellId={participant.spellDId} width={24} height={24} />
          <PerkImage perkId={participant.perks.styles[0].selections[0].perk} width={24} height={24} />
          <SpellImage spellId={participant.spellFId} width={24} height={24} />
          <PerkStyleImage perkStyleId={participant.perks.styles[1].style} width={24} height={24} />
        </Grid>
      </Center>
    </Flex>
  );
}
export default MatchHistoryCardExpandInfoParts;
