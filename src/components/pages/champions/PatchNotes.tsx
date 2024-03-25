import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';

import type { ChampionPatch } from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';

interface PatchNotesProps {
  patches?: ChampionPatch[];
}

export default function PatchNotes({ patches }: PatchNotesProps) {
  return (
    <VStack w="50%" h="full" borderRadius="4px" bg="white" gap="0">
      <Box w="full" h="52px" p="16px 20px" borderBottom="1px solid" borderColor="gray200">
        <Text textStyle="t2" fontWeight="700">
          패치노트
        </Text>
      </Box>
      <VStack w="full" h="328px" overflowY="scroll">
        <Accordion w="full" h="500px" allowToggle bg="white">
          {patches &&
            patches?.length > 0 &&
            patches.map((patch, index) => {
              return <PatchInfo key={index} patch={patch} />;
            })}
        </Accordion>
      </VStack>
    </VStack>
  );
}

interface PatchInfoProps {
  patch: ChampionPatch;
}

function PatchInfo({ patch }: PatchInfoProps) {
  const { enName, version, target, targetImgUrl, changes } = patch;
  const capitalizedEnName = enName.charAt(0).toUpperCase() + enName.slice(1);
  // 기본 능력치의 경우 스킬 이미지가 없기 때문에 챔피언 초상화를 사용
  const imgUrl = targetImgUrl !== null ? `https${targetImgUrl.split('f=http')[1]}` : championIconUrl(capitalizedEnName);
  return (
    <AccordionItem bg="white">
      <AccordionButton
        p="20px"
        h="82px"
        borderBottom="1px solid"
        borderColor="gray200"
        display="flex"
        justifyContent="space-between"
        gap="12px"
      >
        <HStack gap="12px" align="center">
          <Box w="40px" h="40px">
            <Image src={imgUrl} width="40" height="40" alt={target} />
          </Box>
          <VStack gap="4px" justify="flex-start">
            <Text textStyle="t1" fontWeight="700">
              {version} 패치노트
            </Text>
            <Text textStyle="body" fontWeight="400" color="gray600">
              {/* TODO: date difference */}
              2020.11.10 1101일 전
            </Text>
          </VStack>
        </HStack>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel
        p="20px"
        bgColor="gray100"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
      >
        {/* TODO: changes 형태? */}
        <Text textStyle="t2" fontWeight="400" color="gray500">
          -{changes[0].split('⇒')[0]}
        </Text>
        <Text textStyle="t2" fontWeight="400" pl="5px">
          ⇒{changes[0].split('⇒')[1]}
        </Text>
      </AccordionPanel>
    </AccordionItem>
  );
}
