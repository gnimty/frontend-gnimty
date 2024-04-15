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
import { useRouter } from 'next/router';
import { Fragment } from 'react';

import type { ChampionPatch } from '@/apis/types';
import ChampionIcon from '@/components/common/ChampionIcon';

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
  const { version, target, targetImgUrl, changes } = patch;
  const router = useRouter();
  const { championEnName } = router.query;
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
          {targetImgUrl ? (
            <Box w="40px" h="40px">
              <Image
                src={
                  // targetImgUrl의 case가 더 있을 수 있음
                  targetImgUrl.startsWith('https://am-a.akamaihd.net/')
                    ? String(new URL(targetImgUrl).searchParams.get('f')?.replace(/^http:\/\//, 'https://'))
                    : targetImgUrl
                }
                width="40"
                height="40"
                alt={target}
              />
            </Box>
          ) : (
            <ChampionIcon championEnName={championEnName as string} width={40} height={40} />
          )}
          <VStack gap="4px" justify="flex-start">
            <Text textStyle="t1" fontWeight="700">
              {version} 패치노트
            </Text>
            {/* TODO: date difference */}
            {/* <Text textStyle="body" fontWeight="400" color="gray600">
              2020.11.10 1101일 전
            </Text> */}
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
        {changes.map((change) => {
          if (change.includes('⇒')) {
            return (
              <Fragment key={change}>
                <Text textStyle="t2" fontWeight="400" color="gray500">
                  - {change.split('⇒')[0]}
                </Text>
                <Text textStyle="t2" fontWeight="400" pl="5px">
                  ⇒{change.split('⇒')[1]}
                </Text>
              </Fragment>
            );
          }
          return (
            <Text key={change} textStyle="t2" fontWeight="400" pl="5px">
              - {change}
            </Text>
          );
        })}
      </AccordionPanel>
    </AccordionItem>
  );
}
