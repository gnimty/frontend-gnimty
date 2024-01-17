import { ModalBody } from '@chakra-ui/modal';
import { IconButton, Text, VStack } from '@chakra-ui/react';

import Back from '@/assets/icons/system/back.svg';
import type { TermsType } from '@/contexts/AccountModalPageContext';
import { useAccountModalPageContext } from '@/contexts/AccountModalPageContext';

interface TermsModalBodyProps {
  terms: TermsType;
}

export default function TermsModalBody({ terms }: TermsModalBodyProps) {
  const { setCurrentPage } = useAccountModalPageContext();

  return (
    <ModalBody css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
      <IconButton
        position="absolute"
        w="32px"
        h="32px"
        top="24px"
        left="24px"
        aria-label="Back"
        icon={<Back />}
        onClick={() => setCurrentPage({ page: 'SIGNUP' })}
      />
      <VStack w="full" gap="40px">
        <VStack spacing="12px">
          <Text textStyle="h2" color="gray800">
            {terms.title}
          </Text>
        </VStack>
        <VStack>
          <Text textStyle="t2" fontWeight={400} color="black">
            {terms.contents}
          </Text>
        </VStack>
      </VStack>
    </ModalBody>
  );
}
