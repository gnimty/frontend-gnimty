import { useDisclosure } from '@chakra-ui/hooks';
import { Checkbox as _Checkbox, Button, CheckboxGroup, Flex, Radio, RadioGroup, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import dayOfWeekEnumKrMap from '@/apis/constants/dayOfWeekEnumKrMap';
import type { GameMode, RiotDependentInfo, Status } from '@/apis/types';
import useChangeProfile from '@/apis/useChangeProfile';
import Check from '@/assets/icons/system/check.svg';
import StatusIndicator from '@/components/common/StatusIndicator';
import IconCheckbox from '@/components/icons/IconCheckbox';
import TimeBadge from '@/components/pages/mypage/changeState/TimeBadge';
import TimeTableDrawer from '@/components/pages/mypage/changeState/TimeTableDrawer';
import ContentsContainer from '@/components/pages/mypage/ContentsContainer';

import StateMessageInput from './StateMessageInput';

import type { CheckboxProps } from '@chakra-ui/react';

const Checkbox = (props: CheckboxProps) => {
  return <_Checkbox icon={<IconCheckbox as={Check} />} h="40px" {...props} />;
};

export interface ChangeStateTabProps {
  initialStatus: RiotDependentInfo['status'];
  initialIntroduction: RiotDependentInfo['introduction'];
  initialPreferGameModes: RiotDependentInfo['preferGameModes'];
  initialSchedules: RiotDependentInfo['schedules'];
}

export default function ChangeStateTab(props: ChangeStateTabProps) {
  const router = useRouter();

  const { initialStatus, initialIntroduction, initialPreferGameModes, initialSchedules } = props;
  const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure();

  const [status, setStatus] = useState(initialStatus);
  const [introduction, setIntroduction] = useState(initialIntroduction);
  const [preferGameModes, setPreferGameModes] = useState(initialPreferGameModes);
  // TODO: 백엔드 분들과 얘기 나눠 본 후에 완성
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [schedules, setSchedules] = useState(initialSchedules);

  const { changeProfile } = useChangeProfile();

  const handlePreferGameModesChange = (modes: GameMode[]) => {
    setPreferGameModes(modes.map((mode) => ({ gameMode: mode })));
  };

  return (
    <>
      <Flex direction="column" w="full" gap="24px">
        <ContentsContainer title="접속 상태 변경">
          <RadioGroup
            w="full"
            height="40px"
            display="flex"
            onChange={(nextValue) => {
              setStatus(nextValue as Status);
            }}
            value={status}
          >
            <Flex gap="44px">
              <Radio value="ONLINE">
                <Flex alignItems="center">
                  <Text mr="12px">온라인</Text>
                  <StatusIndicator status="ONLINE" />
                </Flex>
              </Radio>
              <Radio value="AWAY">
                <Flex alignItems="center">
                  <Text mr="12px">자리비움</Text>
                  <StatusIndicator status="AWAY" />
                </Flex>
              </Radio>
              <Radio value="OFFLINE">
                <Flex alignItems="center">
                  <Text mr="12px">오프라인</Text>
                  <StatusIndicator status="OFFLINE" />
                </Flex>
              </Radio>
            </Flex>
          </RadioGroup>
        </ContentsContainer>
        <ContentsContainer title="상태 메세지">
          <StateMessageInput
            value={introduction}
            onChange={(e) => {
              setIntroduction(e.target.value);
            }}
            placeholder="자신을 소개할 수 있는 내용을 작성해 주세요."
            rows={2}
          />
        </ContentsContainer>
        <ContentsContainer title="선호 게임 타입">
          <CheckboxGroup value={preferGameModes.map((mode) => mode.gameMode)} onChange={handlePreferGameModesChange}>
            <Flex w="full" direction="row" gap="24px">
              <Checkbox value="RANK_SOLO">솔로 랭크</Checkbox>
              <Checkbox value="RANK_FLEX">자유 랭크</Checkbox>
              <Checkbox value="BLIND">칼바람 나락</Checkbox>
            </Flex>
          </CheckboxGroup>
        </ContentsContainer>
        <ContentsContainer title="게임 가능 시간">
          <Button
            position="absolute"
            top={0}
            right={0}
            w="144px"
            size="md"
            variant="default"
            bg="gray800"
            onClick={onOpenDrawer}
          >
            시간 설정
          </Button>
          <Flex direction="column" alignSelf="flex-start" gap="12px" mt="32px">
            {schedules.map((schedule) => (
              <Flex key={schedule.dayOfWeek} gap="12px" alignItems="center">
                <Text textStyle="t2" fontWeight={400}>
                  {dayOfWeekEnumKrMap[schedule.dayOfWeek]}
                </Text>
                {schedule.times.map((time) => (
                  <TimeBadge
                    key={`${time.startTime}-${time.endTime}`}
                    startTime={time.startTime}
                    endTime={time.endTime}
                  />
                ))}
              </Flex>
            ))}
          </Flex>
        </ContentsContainer>
        <Button
          mt="40px"
          w="full"
          size="lg"
          variant="default"
          onClick={() => {
            changeProfile(
              { introduction, preferGameModes, schedules, status },
              {
                onSuccess() {
                  router.reload();
                  alert('성공적으로 변경 되었습니다!');
                },
                onError() {
                  alert('변경하는 도중 에러가 발생했습니다.');
                },
              },
            );
          }}
        >
          변경사항 저장
        </Button>
      </Flex>
      <TimeTableDrawer currentTimeData={[0, 0, 0, 0, 0, 0, 0]} isOpen={isOpenDrawer} onClose={onCloseDrawer} />
    </>
  );
}
