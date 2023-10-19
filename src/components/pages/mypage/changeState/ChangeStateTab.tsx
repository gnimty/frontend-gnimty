import { useDisclosure } from '@chakra-ui/hooks';
import {
  Button,
  Checkbox as _Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

import Check from '@/assets/icons/system/check.svg';
import ContentsContainer from '@/components/pages/mypage/ContentsContainer';

import type { CheckboxProps } from '@chakra-ui/react';

const Checkbox = (props: CheckboxProps) => {
  return <_Checkbox icon={<Check />} h="40px" {...props} />;
};

export default function ChangeStateTab() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack w="full">
        <ContentsContainer title="접속 상태 변경">
          <RadioGroup w="full">
            <HStack gap="44px">
              <Radio value="1">온라인</Radio>
              <Radio value="2">오프라인</Radio>
              <Radio value="3">자리비움</Radio>
            </HStack>
          </RadioGroup>
        </ContentsContainer>
        <ContentsContainer title="상태 메세지">
          <RadioGroup w="full">
            <Stack direction="column">
              <Radio value="1" />
              <Radio value="2" />
              <Radio value="3" />
            </Stack>
          </RadioGroup>
        </ContentsContainer>
        <ContentsContainer title="선호 게임 타입">
          <CheckboxGroup>
            <HStack w="full" direction="row" gap="24px">
              <Checkbox>솔로 랭크</Checkbox>
              <Checkbox>자유 랭크</Checkbox>
              <Checkbox>칼바람 나락</Checkbox>
            </HStack>
          </CheckboxGroup>
        </ContentsContainer>
        <ContentsContainer title="게임 가능 시간">
          <Button w="144px" size="md" variant="default" onClick={onOpen}>
            시간 설정
          </Button>
          <Text alignSelf="flex-start" textStyle="t2" fontWeight={400}>
            월요일 19시 ~ 23시
          </Text>
        </ContentsContainer>
      </VStack>
      <Drawer placement="right" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerCloseButton />
        <DrawerContent>
          <DrawerHeader>상세 설정</DrawerHeader>
          <DrawerBody>
            <p>some contents</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
