import { HStack, IconButton, Modal, ModalContent, ModalOverlay, Text, VStack } from '@chakra-ui/react';

import Exit from '@/assets/icons/system/exit.svg';

import SummonerCard from './SummonerCard';

interface RecommendsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecommendsModal = ({ isOpen, onClose }: RecommendsModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        w="1040px"
        maxH="650px"
        borderRadius="8px"
        bgColor="white"
        display="flex"
        flexDir="column"
        justifyContent="space-between"
      >
        <HStack
          w="100%"
          h="56px"
          justify="space-between"
          align="center"
          p="16px 20px"
          borderBottom="1px solid"
          borderColor="gray200"
        >
          <HStack gap="8px">
            <Text textStyle="t1" fontWeight="700">
              소환사 추천
            </Text>
            <Text textStyle="t2" fontWeight="400" color="gray500">
              최근 20게임 기준
            </Text>
          </HStack>
          <IconButton w="24px" h="24px" aria-label="close" onClick={onClose} icon={<Exit />} />
        </HStack>
        <VStack w="100%" h="540px" p="16px 0" gap="10px" overflow="hidden" bgColor="gray100">
          {/* Selector - solo / free */}
          {/* TODO: into carousel */}
          <HStack w="1000px" h="full" gap="20px">
            {Array.from({ length: 3 }).map((_, index) => (
              <SummonerCard key={index} />
            ))}
          </HStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default RecommendsModal;
