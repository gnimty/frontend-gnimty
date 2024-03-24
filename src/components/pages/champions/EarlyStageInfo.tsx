import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

import dataDragonVersion from '@/apis/constants/dataDragonVersion';
import type {
  ItemBootsComponentStat,
  ItemMiddleComponentStat,
  ItemStartComponentStat,
  SpellComponentStat,
} from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';
import itemIconUrl from '@/apis/utils/itemIconUrl';
import spellIconUrl from '@/apis/utils/spellIconUrl';

interface EarlyStageInfoProps {
  type: 'summoner-spell' | 'start-item' | 'first-return' | 'shoes';
  spellBuilds?: SpellComponentStat[];
  initialItemBuilds?: ItemStartComponentStat[];
  shoesBuilds?: ItemBootsComponentStat[];
  itemMiddleBuilds?: ItemMiddleComponentStat[];
}

const TITLE = {
  'summoner-spell': '소환사 주문',
  'start-item': '시작 아이템',
  'first-return': '첫 귀환',
  shoes: '신발',
};

export default function EarlyStageInfo({
  type,
  spellBuilds,
  initialItemBuilds,
  itemMiddleBuilds,
  shoesBuilds,
}: EarlyStageInfoProps) {
  const target = ((type) => {
    switch (type) {
      case 'summoner-spell':
        return spellBuilds;
      case 'start-item':
        return initialItemBuilds;
      case 'first-return':
        return itemMiddleBuilds;
      case 'shoes':
        return shoesBuilds;
    }
  })(type);
  return (
    <VStack w="full" bg="white" borderRadius="4px">
      <Box w="full" h="54px" p="16px 20px" borderBottom="1px solid" borderColor="gray200">
        <Text textStyle="t2" fontWeight="700">
          {TITLE[type]}
        </Text>
      </Box>
      {target?.map((build) => {
        let imgs: string[] = [];
        switch (type) {
          case 'summoner-spell':
            imgs = [
              spellIconUrl((build as SpellComponentStat).spellD),
              spellIconUrl((build as SpellComponentStat).spellF),
            ];
            break;
          case 'start-item':
            imgs = (build as ItemStartComponentStat).itemStart.map((itemId) => itemIconUrl(itemId));
            break;
          case 'first-return':
            imgs = [itemIconUrl((build as ItemMiddleComponentStat).itemMiddle)];
            break;
          case 'shoes':
            imgs = [itemIconUrl((build as ItemBootsComponentStat).itemBoots)];
            break;
        }
        return (
          <HStack key={build.winRate} w="full" p="20px" justify="space-between">
            <HStack gap="8px">
              {imgs.map((imgUrl, index) => (
                <Box key={index} w="40px" h="40px" borderRadius="4px" overflow="hidden">
                  <Image src={imgUrl} width="40" height="40" alt={type + imgUrl} />
                </Box>
              ))}
            </HStack>
            <HStack gap="8px">
              <Text textStyle="t1" fontWeight="700" color="blue800">
                {(build.winRate * 100).toFixed(2)}%
              </Text>
              <Text textStyle="body" fontWeight="400" color="gray500">
                {build.plays.toLocaleString('ko-KR')}게임
              </Text>
            </HStack>
          </HStack>
        );
      })}
    </VStack>
  );
}
