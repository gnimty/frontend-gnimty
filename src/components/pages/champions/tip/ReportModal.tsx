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
import React, { useState } from 'react';

import Exit from '@/assets/icons/system/exit.svg';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleReport: (reportType: 'ABUSE' | 'OTHER', reportComment?: string) => void;
}

export const ReportModal = ({ isOpen, onClose, handleReport }: ReportModalProps) => {
  const [optionType, setOptionType] = useState<'ABUSE' | 'OTHER' | null>(null);
  const [reportComment, setReportComment] = useState('');
  const buttonActive = (() => {
    if (optionType === null) return false;
    if (optionType === 'ABUSE') return true;
    if (optionType === 'OTHER' && reportComment.length > 0) return true;
    return false;
  })();

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
          <IconButton w="24px" h="24px" aria-label="close" icon={<Exit />} onClick={onClose} />
        </ModalHeader>
        <ModalBody display="flex" flexDir="column" h="520px" p="20px" gap="20px" alignItems="flex-start">
          <VStack gap="12px" align="flex-start">
            <Text textStyle="body" fontWeight="700">
              신고사유
            </Text>
            <CheckboxGroup
              colorScheme="main"
              onChange={(v) => {
                if (v.includes('OTHER')) {
                  setOptionType('OTHER');
                }
                if (!v.includes('OTHER') && v.length > 0) {
                  setOptionType('ABUSE');
                }
                if (v.length === 0) {
                  setOptionType(null);
                }
              }}
            >
              <Checkbox size="md" value="0">
                욕설 및 혐오발언
              </Checkbox>
              <Checkbox size="md" value="1">
                음란하거나 성적인 발언
              </Checkbox>
              <Checkbox size="md" value="2">
                허위 발언
              </Checkbox>
              <Checkbox size="md" value="3">
                도배하는 댓글
              </Checkbox>
              <Checkbox size="md" value="4">
                홍보 및 불법광고
              </Checkbox>
              <Checkbox size="md" value="5">
                개인정보 노출
              </Checkbox>
              <Checkbox size="md" value="OTHER">
                기타
              </Checkbox>
            </CheckboxGroup>
          </VStack>
          <Textarea
            h="224px"
            value={reportComment}
            onChange={(e) => setReportComment(e.target.value)}
            rows={5}
            placeholder="상세한 신고 사유를 입력해 주세요."
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
            bgColor={buttonActive ? 'main' : 'gray200'}
            fontWeight="700"
            textStyle="t2"
            color={buttonActive ? 'white' : 'gray500'}
            disabled={!buttonActive}
            cursor={buttonActive ? 'pointer' : 'not-allowed'}
            onClick={() => {
              if (optionType !== null) {
                if (optionType === 'ABUSE') {
                  handleReport(optionType, reportComment.trim());
                }
                if (optionType === 'OTHER' && reportComment.length > 0) {
                  handleReport(optionType, reportComment.trim());
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
