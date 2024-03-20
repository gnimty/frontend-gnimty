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

import championIconUrl from '@/apis/utils/championIconUrl';

export default function PatchNotes() {
  return (
    <VStack w="full" h="full" borderRadius="4px" bg="white" gap="0">
      <Box w="full" h="52px" p="16px 20px" borderBottom="1px solid" borderColor="gray200">
        <Text textStyle="t2" fontWeight="700">
          패치노트
        </Text>
      </Box>
      <VStack w="full" h="328px" overflowY="scroll">
        <Accordion w="full" h="500px" allowToggle bg="white">
          {Array.from({ length: 10 }).map((_, index) => {
            return <PatchInfo key={index} />;
          })}
        </Accordion>
      </VStack>
    </VStack>
  );
}

function PatchInfo() {
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
            <Image src={championIconUrl('Annie')} width="40" height="40" alt="Annie, 애니" />
          </Box>
          <VStack gap="4px" justify="flex-start">
            <Text textStyle="t1" fontWeight="700">
              10.23 패치노트
            </Text>
            <Text textStyle="body" fontWeight="400" color="gray600">
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
        <Text textStyle="t2" fontWeight="400" color="gray500">
          -최소 물리 피해량 50/125/200 (+총 공격력의 25%)
        </Text>
        <Text textStyle="t2" fontWeight="400">
          {'\t'}⇒최소 물리 피해량 64/154/244 (+총 공격력의 25%)
        </Text>
      </AccordionPanel>
    </AccordionItem>
  );
}
