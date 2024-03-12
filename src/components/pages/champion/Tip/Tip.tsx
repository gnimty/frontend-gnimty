import { HStack, Text, VStack } from '@chakra-ui/react';

import dataDragonVersion from '@/apis/constants/dataDragonVersion';
import ToggleSwitch from '@/components/common/ToggleSwitch';

import Comment from './Comment';
import TipInput from './TipInput';

export default function Tip() {
  return (
    <VStack w="full" borderRadius="4px" bg="white">
      <HStack w="full" h="52px" p="12px 24px" borderBottom="1px solid" borderColor="gray200" justify="space-between">
        <Text textStyle="t1" fontWeight="700">
          운영 팁
        </Text>
        <HStack gap="12px">
          <ToggleSwitch label="최신 버전만 보기" onOff={true} onClick={() => console.log('test')} width={30} />
          <Text textStyle="t1" fontWeight="400" color="gray700">
            v{dataDragonVersion}
          </Text>
        </HStack>
      </HStack>
      {/* Input */}
      <TipInput />
      {/* Comments */}
      {Array.from({ length: 3 }).map((_, index) => (
        <Comment key={index} replies={index === 1 ? ['1', '2'] : []} />
      ))}
    </VStack>
  );
}
