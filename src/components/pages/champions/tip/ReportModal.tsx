import {
  Button,
  Checkbox,
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

import type { ReportType } from '@/apis/types';
import Exit from '@/assets/icons/system/exit.svg';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleReport: (reportType: ReportType[], reportComment?: string) => void;
}

export const ReportModal = ({ isOpen, onClose, handleReport }: ReportModalProps) => {
  const [optionType, setOptionType] = useState<ReportType[]>([]);
  const [reportComment, setReportComment] = useState('');
  const buttonActive = optionType.includes('OTHER') ? reportComment.length > 0 : optionType.length > 0;

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
            <Checkbox
              size="md"
              colorScheme="main"
              value="ABUSE"
              onChange={(e) => {
                if (!e.target.checked) {
                  setOptionType((prev) => prev.filter((type) => type !== (e.target.value as ReportType)));
                }
                if (e.target.checked) {
                  setOptionType((prev) => [...prev, e.target.value as ReportType]);
                }
              }}
              checked={optionType.includes('ABUSE')}
            >
              욕설 및 혐오발언
            </Checkbox>
            <Checkbox
              size="md"
              colorScheme="main"
              value="OBSCENE"
              onChange={(e) => {
                if (!e.target.checked) {
                  setOptionType((prev) => prev.filter((type) => type !== (e.target.value as ReportType)));
                }
                if (e.target.checked) {
                  setOptionType((prev) => [...prev, e.target.value as ReportType]);
                }
              }}
              checked={optionType.includes('OBSCENE')}
            >
              음란하거나 성적인 발언
            </Checkbox>
            <Checkbox
              size="md"
              colorScheme="main"
              value="FALSEHOOD"
              onChange={(e) => {
                if (!e.target.checked) {
                  setOptionType((prev) => prev.filter((type) => type !== (e.target.value as ReportType)));
                }
                if (e.target.checked) {
                  setOptionType((prev) => [...prev, e.target.value as ReportType]);
                }
              }}
              checked={optionType.includes('FALSEHOOD')}
            >
              허위 발언
            </Checkbox>
            <Checkbox
              size="md"
              colorScheme="main"
              value="SPAMMING"
              onChange={(e) => {
                if (!e.target.checked) {
                  setOptionType((prev) => prev.filter((type) => type !== (e.target.value as ReportType)));
                }
                if (e.target.checked) {
                  setOptionType((prev) => [...prev, e.target.value as ReportType]);
                }
              }}
              checked={optionType.includes('SPAMMING')}
            >
              도배하는 댓글
            </Checkbox>
            <Checkbox
              size="md"
              colorScheme="main"
              value="ILLEGAL_ADVERTISING"
              onChange={(e) => {
                if (!e.target.checked) {
                  setOptionType((prev) => prev.filter((type) => type !== (e.target.value as ReportType)));
                }
                if (e.target.checked) {
                  setOptionType((prev) => [...prev, e.target.value as ReportType]);
                }
              }}
              checked={optionType.includes('ILLEGAL_ADVERTISING')}
            >
              홍보 및 불법광고
            </Checkbox>
            <Checkbox
              size="md"
              colorScheme="main"
              value="PERSONAL_INFORMATION_EXPOSURE"
              onChange={(e) => {
                if (!e.target.checked) {
                  setOptionType((prev) => prev.filter((type) => type !== (e.target.value as ReportType)));
                }
                if (e.target.checked) {
                  setOptionType((prev) => [...prev, e.target.value as ReportType]);
                }
              }}
              checked={optionType.includes('PERSONAL_INFORMATION_EXPOSURE')}
            >
              개인정보 노출
            </Checkbox>
            <Checkbox
              size="md"
              colorScheme="main"
              value="OTHER"
              onChange={(e) => {
                if (!e.target.checked) {
                  setOptionType((prev) => prev.filter((type) => type !== (e.target.value as ReportType)));
                }
                if (e.target.checked) {
                  setOptionType((prev) => [...prev, e.target.value as ReportType]);
                }
              }}
              checked={optionType.includes('OTHER')}
            >
              기타
            </Checkbox>
          </VStack>
          <Textarea
            h="224px"
            value={reportComment}
            onChange={(e) => setReportComment(e.target.value)}
            rows={5}
            disabled={optionType && !optionType.includes('OTHER')}
            cursor={optionType && !optionType.includes('OTHER') ? 'not-allowed' : 'auto'}
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
              if (optionType.length > 0) {
                if (!optionType.includes('OTHER')) {
                  handleReport(optionType);
                }
                if (optionType.includes('OTHER') && reportComment.length > 0) {
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
