import { ModalBody } from '@chakra-ui/modal';
import { IconButton, Text, VStack } from '@chakra-ui/react';
import { useContext } from 'react';

import Back from '@/assets/icons/system/back.svg';
import { PageContext } from '@/components/pages/account/AccountModal';
import type { TermsType } from '@/constants/termsList';

interface PolicyModalBodyProps {
  terms: TermsType;
}

export default function PolicyModalBody({ terms }: PolicyModalBodyProps) {
  const pageContext = useContext(PageContext);
  const { currentPage, setCurrentPage } = pageContext;

  return (
    <ModalBody>
      <IconButton
        position="absolute"
        w="32px"
        h="32px"
        top="24px"
        left="24px"
        aria-label="Back"
        icon={<Back />}
        onClick={() => setCurrentPage({ page: 'SIGNUP', signupFormData: currentPage.signupFormData })}
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
