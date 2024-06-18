import {
  Button,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  type UseDisclosureReturn,
} from '@chakra-ui/react';
import { useState } from 'react';

import ExitIcon from '@/assets/icons/system/exit.svg';

interface WithdrawalProps {
  disclosure: UseDisclosureReturn;
}

const WITHDRAWAL_PHARASE = '위 내용을 숙지하였으며, 회원 탈퇴를 진행합니다.';

function WithdrawalModal({ disclosure }: WithdrawalProps) {
  const { isOpen, onClose } = disclosure;
  const [pharase, setPharse] = useState('');

  const handlePharaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPharse(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          w="full"
          h="56px"
          borderBottom="1px solid"
          borderColor="gray200"
          p="16px 20px"
          display="flex"
          justifyContent="space-between"
        >
          <Text textStyle="t1" fontWeight="700">
            회원탈퇴
          </Text>
          <IconButton aria-label="close" icon={<ExitIcon />} onClick={onClose} w="24px" h="24px" />
        </ModalHeader>
        <ModalBody w="full" p="20px" gap="20px">
          <VStack w="full" gap="12px" align="flex-start">
            <Text textStyle="t2" fontWeight="700">
              회원 탈퇴 시 주의사항
            </Text>
            <VStack w="full" borderRadius="8px" p="12px" gap="12px" bgColor="gray100" align="flex-start">
              <VStack w="full" gap="4px" align="flex-start">
                <Text textStyle="t2" fontWeight="700">
                  SNS 계정 연동 해제
                </Text>
                <Text textStyle="t2" fontWeight="400">
                  탈퇴 시 모든 SNS 계정 연동이 해제됩니다.
                </Text>
              </VStack>
              <VStack w="full" gap="4px" align="flex-start">
                <Text textStyle="t2" fontWeight="700">
                  이전에 작성한 게시물
                </Text>
                <Text textStyle="t2" fontWeight="400">
                  챔피언 질문/팁에 등록한 댓글은 탈퇴 후에도 삭제되지 않습니다.
                  <br />
                  게시물 삭제를 원하신다면 계정을 탈퇴하기 전 삭제를 원하는 게시물을 직접 삭제하실 수 있습니다.
                </Text>
              </VStack>
              <VStack w="full" gap="4px" align="flex-start">
                <Text textStyle="t2" fontWeight="700">
                  채팅 기록
                </Text>
                <Text textStyle="t2" fontWeight="400">
                  연동한 라이엇 계정을 통한 대표 소환사의 채팅 기록이 모두 사라집니다.
                </Text>
              </VStack>
              <VStack w="full" gap="4px" align="flex-start">
                <Text textStyle="t2" fontWeight="700">
                  소환사 즐겨찾기
                </Text>
                <Text textStyle="t2" fontWeight="400">
                  등록한 즐겨찾기 소환사 목록에 해당하는 캐시 기록을 삭제합니다.
                </Text>
              </VStack>
            </VStack>
          </VStack>
          <VStack w="full" gap="4px">
            <Input
              w="full"
              h="40px"
              borderRadius="4px"
              border="1px solid"
              borderColor="gray300"
              p="10px 10px 10px 12px"
              placeholder={WITHDRAWAL_PHARASE}
              _placeholder={{
                color: 'gray500',
                textStyle: 't2',
              }}
              value={pharase}
              onChange={handlePharaseChange}
            />
            <Text textStyle="body" color="gray500">
              * 내용에 동의한다면 위의 문장을 똑같이 입력해 주세요.
            </Text>
          </VStack>
          <Button type="submit" w="full" h="48px" disabled={pharase !== WITHDRAWAL_PHARASE}>
            그님티 탈퇴
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default WithdrawalModal;
