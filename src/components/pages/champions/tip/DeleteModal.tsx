import { Button, Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
}

export const DeleteModal = ({ isOpen, onClose, handleDelete }: DeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        w="280px"
        h="144px"
        borderRadius="8px"
        p="12px"
        display="flex"
        flexDir="column"
        gap="24px"
        bgColor="white"
        justifyContent="space-between"
      >
        <ModalHeader h="44px">
          <Text textStyle="t1" fontWeight="700" color="gray800" textAlign="center">
            작성하신 글을
            <br />
            정말로 삭제하신겠습니까?
          </Text>
        </ModalHeader>
        <ModalFooter w="full" h="40px" gap="12px" display="flex" alignItems="center">
          <Button w="full" borderRadius="4px" border="1px solid" borderColor="gray200" p="10px 12px" onClick={onClose}>
            <Text textStyle="t2" fontWeight="400" color="gray700">
              취소
            </Text>
          </Button>
          <Button w="full" borderRadius="4px" bgColor="gray800" p="10px 12px" onClick={handleDelete}>
            <Text textStyle="t2" fontWeight="400" color="white">
              확인
            </Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
