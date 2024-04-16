import {
  Button,
  Checkbox,
  CheckboxGroup,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';

import Exit from '@/assets/icons/system/exit.svg';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleReport: (reportType: 'ABUSE' | 'OTHER', reportComment?: string) => void;
}

export const ReportModal = ({ isOpen, onClose, handleReport }: ReportModalProps) => {
  const [optionType, setOptionType] = useState<'ABUSE' | 'OTHER'>();
  const reportCommentRef = useRef<HTMLTextAreaElement>(null);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w="400px" h="576px" borderRadius="8px" bgColor="white">
        <ModalHeader
          display="flex"
          h="56px"
          justifyContent="space-between"
          borderBottom="1px solid"
          borderColor="gray200"
          p="16px 20px"
        >
          <Text textStyle="t1" fontWeight="700">
            신고하기
          </Text>
          <IconButton w="24px" h="24px" aria-label="close" icon={<Exit />} />
        </ModalHeader>
        <ModalBody display="flex" flexDir="column" h="520px" p="20px" gap="20px" alignItems="flex-start">
          <VStack gap="12px">
            <Text textStyle="body" fontWeight="700">
              신고사유
            </Text>
            <CheckboxGroup
              onChange={(v) => {
                if (Array.isArray(v)) {
                  setOptionType('ABUSE');
                  if (v.includes('OTHER')) {
                    setOptionType('OTHER');
                  }
                }
                if (typeof v === 'number') {
                  setOptionType('ABUSE');
                }
                if (typeof v === 'string') {
                  setOptionType('OTHER');
                }
              }}
            >
              <Checkbox size="md" colorScheme="main" value={0}>
                욕설 및 혐오발언
              </Checkbox>
              <Checkbox size="md" colorScheme="main" value={1}>
                음란하거나 성적인 발언
              </Checkbox>
              <Checkbox size="md" colorScheme="main" value={2}>
                허위 발언
              </Checkbox>
              <Checkbox size="md" colorScheme="main" value={3}>
                도배하는 댓글
              </Checkbox>
              <Checkbox size="md" colorScheme="main" value={4}>
                홍보 및 불법광고
              </Checkbox>
              <Checkbox size="md" colorScheme="main" value={5}>
                개인정보 노출
              </Checkbox>
              <Checkbox size="md" colorScheme="main" value="OTHER">
                기타
              </Checkbox>
            </CheckboxGroup>
          </VStack>
          <Textarea
            h="224px"
            ref={reportCommentRef}
            rows={5}
            _placeholder={{
              textStyle: 't2',
              fontWeight: '400',
              color: 'gray500',
            }}
          />
          <Button
            w="full"
            h="48px"
            borderRadius="4px"
            p="14px 12px"
            isActive={optionType === 'ABUSE' || (optionType === 'OTHER' && Boolean(reportCommentRef.current?.value))}
            _active={{
              bgColor: 'main',
              color: 'white',
            }}
            cursor={
              optionType === 'ABUSE' || (optionType === 'OTHER' && Boolean(reportCommentRef.current?.value))
                ? 'pointer'
                : 'not-allowed'
            }
            onClick={() => {
              if (optionType !== undefined) {
                if (optionType === 'ABUSE') {
                  handleReport(optionType, reportCommentRef.current?.value);
                }
                if (optionType === 'OTHER' && reportCommentRef.current?.value) {
                  handleReport(optionType, reportCommentRef.current.value);
                }
              }
            }}
          >
            신고하기
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
