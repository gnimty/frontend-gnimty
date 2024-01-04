import { useDisclosure } from '@chakra-ui/hooks';
import { Button, Checkbox as _Checkbox, CheckboxGroup, Flex, Radio, RadioGroup, Text } from '@chakra-ui/react';
import { isNumeric } from '@chakra-ui/utils';
import { useState } from 'react';

import type { GameMode, RiotDependentInfo, Status } from '@/apis/types';
import Check from '@/assets/icons/system/check.svg';
import StatusIndicator from '@/components/common/StatusIndicator';
import IconCheckbox from '@/components/icons/IconCheckbox';
import StateMessageRadio from '@/components/pages/mypage/changeState/StateMessageRadio';
import TimeBadge from '@/components/pages/mypage/changeState/TimeBadge';
import TimeTableDrawer from '@/components/pages/mypage/changeState/TimeTableDrawer';
import ContentsContainer from '@/components/pages/mypage/ContentsContainer';

import type { CheckboxProps } from '@chakra-ui/react';

const Checkbox = (props: CheckboxProps) => {
  return <_Checkbox icon={<IconCheckbox as={Check} />} h="40px" {...props} />;
};

export interface ChangeStateTabProps {
  initialValues: Pick<RiotDependentInfo, 'status' | 'introductions' | 'preferGameModes' | 'schedules'>;
}
export default function ChangeStateTab({ initialValues }: ChangeStateTabProps) {
  const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure();

  const [status, setStatus] = useState<Status>(initialValues.status);
  const [introduction, setIntroduction] = useState<RiotDependentInfo['introductions'][0] | '_empty'>(
    initialValues.introductions.find((intro) => intro.isMain) ?? '_empty',
  );
  const [preferGameModes, setPreferGameModes] = useState<RiotDependentInfo['preferGameModes']>(
    initialValues.preferGameModes,
  );

  const _setIntroduction = (id: string) => {
    setIntroduction(
      isNumeric(id) ? initialValues.introductions.find((intro) => intro.id === parseInt(id, 10)) ?? '_empty' : '_empty',
    );
  };

  const _setPreferGameModes = (modes: GameMode[]) => {
    setPreferGameModes(
      modes.map((mode) => {
        return { gameMode: mode };
      }),
    );
  };

  return (
    <>
      <Flex direction="column" w="full" gap="24px">
        <ContentsContainer title="접속 상태 변경">
          <RadioGroup
            w="full"
            height="40px"
            display="flex"
            onChange={setStatus as (status: string) => void}
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
          <RadioGroup
            w="full"
            onChange={_setIntroduction}
            value={introduction === '_empty' ? '_empty' : introduction.id.toString()}
          >
            <Flex direction="column" gap="8px">
              {initialValues.introductions.map((introduction, index) => (
                <StateMessageRadio key={index} value={introduction.id.toString()} content={introduction.content} />
              ))}
              <StateMessageRadio key="_empty" value="_empty" />
            </Flex>
          </RadioGroup>
        </ContentsContainer>
        <ContentsContainer title="선호 게임 타입">
          <CheckboxGroup value={preferGameModes.map((mode) => mode.gameMode)} onChange={_setPreferGameModes}>
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
            <Flex gap="12px" alignItems="center">
              <Text textStyle="t2" fontWeight={400}>
                월요일
              </Text>
              <TimeBadge startTime={19} endTime={23} />
              <TimeBadge startTime={19} endTime={23} />
            </Flex>
            <Flex gap="12px" alignItems="center">
              <Text textStyle="t2" fontWeight={400}>
                화요일
              </Text>
              <TimeBadge startTime={19} endTime={23} />
            </Flex>
          </Flex>
        </ContentsContainer>
        <Button mt="40px" w="full" size="lg" variant="default">
          변경사항 저장
        </Button>
      </Flex>
      <TimeTableDrawer currentTimeData={[0, 0, 0, 0, 0, 0, 0]} isOpen={isOpenDrawer} onClose={onCloseDrawer} />
    </>
  );
}
