import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import type { DayOfWeek, ScheduleEntry } from '@/apis/types';
import rawToScheduleEntryTimes from '@/utils/scheduleEntry/rawToScheduleEntryTimes';
import scheduleEntryTimesToRaw from '@/utils/scheduleEntry/scheduleEntryTimesToRaw';
import useLazyRef from '@/utils/useLazyRef';

const schedulesToIsButtonToggledList = (schedules: ScheduleEntry[]): boolean[][] =>
  schedules.map((scheduleEntry) => scheduleEntryTimesToRaw(scheduleEntry.times));

const DAY_OF_WEEKS: DayOfWeek[] = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] satisfies DayOfWeek[];
const isButtonToggledListToSchedules = (isButtonToggledList: boolean[][]) =>
  DAY_OF_WEEKS.map((dayOfWeek, i) => ({
    dayOfWeek,
    times: rawToScheduleEntryTimes(isButtonToggledList[i]),
  }));

export interface TimeTableDrawerProps {
  initialSchedules: ScheduleEntry[];
  isOpen: boolean;
  onClose: () => void;
  onSaveButtonClick: (newSchedules: ScheduleEntry[]) => void;
}

export default function TimeTableDrawer(props: TimeTableDrawerProps) {
  const { initialSchedules, isOpen, onClose, onSaveButtonClick } = props;

  const [isButtonToggledList, setIsButtonToggledList] = useState<boolean[][]>(() =>
    schedulesToIsButtonToggledList(initialSchedules),
  );
  const prevIsButtonToggledListRef = useLazyRef(() => structuredClone(isButtonToggledList));

  const startPosRef = useRef<[number, number]>();

  const handleResetButtonClick = () => {
    const newIsButtonToggledList = schedulesToIsButtonToggledList(initialSchedules);
    setIsButtonToggledList(structuredClone(newIsButtonToggledList));
    prevIsButtonToggledListRef.current = structuredClone(newIsButtonToggledList);
  };

  const handleMouseDown = (x: number, y: number) => {
    const newIsButtonToggledList = structuredClone(prevIsButtonToggledListRef.current);
    newIsButtonToggledList[x][y] = !newIsButtonToggledList[x][y];
    setIsButtonToggledList(newIsButtonToggledList);
    startPosRef.current = [x, y];
  };

  useEffect(() => {
    const handleMouseUp = () => {
      if (startPosRef.current === undefined) {
        return;
      }

      startPosRef.current = undefined;
      // 하나의 요일이라도 3개 이상의 스케줄을 가지고 있으면 true, 아니면 false
      const isEntryTimesCountLimitExceeded = isButtonToggledList.some(
        (isToggledList) => rawToScheduleEntryTimes(isToggledList).length > 3,
      );
      if (isEntryTimesCountLimitExceeded) {
        alert('각 요일에 최대 3개의 시간대 설정이 가능합니다.');
        setIsButtonToggledList(structuredClone(prevIsButtonToggledListRef.current));
      } else {
        prevIsButtonToggledListRef.current = structuredClone(isButtonToggledList);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isButtonToggledList, prevIsButtonToggledListRef]);

  const handleMouseOver = (currentX: number, currentY: number) => {
    if (startPosRef.current === undefined) {
      return;
    }
    const [startX, startY] = startPosRef.current;
    const [smallX, largeX] = [startX, currentX].sort((a, b) => a - b);
    const [smallY, largeY] = [startY, currentY].sort((a, b) => a - b);
    const newIsButtonToggledList = structuredClone(prevIsButtonToggledListRef.current);
    for (let x = smallX; x <= largeX; x += 1) {
      for (let y = smallY; y <= largeY; y += 1) {
        newIsButtonToggledList[x][y] = !prevIsButtonToggledListRef.current[startX][startY];
      }
    }
    setIsButtonToggledList(newIsButtonToggledList);
  };

  const handleSaveButtonClick = () => {
    onSaveButtonClick(isButtonToggledListToSchedules(isButtonToggledList));
  };

  return (
    <Drawer size="default" placement="right" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>상세 설정</DrawerHeader>
        <DrawerBody>
          <Text textStyle="body" fontWeight={700} color="gray800">
            게임 가능 시간
          </Text>
          <Grid
            mt="12px"
            templateAreas={`". week" "time table"`}
            gridTemplateColumns="2fr 1fr"
            gridTemplateRows="auto 1fr"
            gridColumnGap="12px"
            gridRowGap="4px"
            textStyle="body"
            fontWeight={400}
          >
            <GridItem
              as={Grid}
              gridTemplateColumns="repeat(7, minmax(44px, auto))"
              gridGap="4px"
              area="week"
              textAlign="center"
            >
              <GridItem>월</GridItem>
              <GridItem>화</GridItem>
              <GridItem>수</GridItem>
              <GridItem>목</GridItem>
              <GridItem>금</GridItem>
              <GridItem>토</GridItem>
              <GridItem>일</GridItem>
            </GridItem>
            <GridItem as={Grid} gridTemplateRows="repeat(24, 20px)" gridGap="4px" area="time">
              {[...Array(24).keys()].map((i) => {
                return (
                  <GridItem as={Flex} alignItems="center" key={i}>
                    <Text>{i.toString().padStart(2, '0')}시</Text>
                  </GridItem>
                );
              })}
            </GridItem>
            <GridItem
              as={Grid}
              area="table"
              gridTemplateColumns="repeat(7, minmax(44px, auto))"
              gridTemplateRows="repeat(24, 20px)"
              gridAutoFlow="column"
              gridGap="4px"
            >
              {isButtonToggledList.flatMap((isToggledList, weekIndex) =>
                isToggledList.map((isToggled, hourIndex) => (
                  <GridItem
                    as={Button}
                    // "4-4" 등의 낮은 숫자에서 겹치는 걸 막기 위해 `hourIndex`에 100을 곱함.
                    key={`${weekIndex}-${hourIndex * 100}`}
                    onMouseDown={() => {
                      handleMouseDown(weekIndex, hourIndex);
                    }}
                    onMouseOver={() => {
                      handleMouseOver(weekIndex, hourIndex);
                    }}
                    bg={isToggled ? 'red800' : 'gray200'}
                  />
                )),
              )}
            </GridItem>
          </Grid>
        </DrawerBody>
        <DrawerFooter gap="12px">
          <Button
            size="lg"
            variant="line"
            px="16px"
            textColor="gray500"
            fontWeight="400"
            onClick={handleResetButtonClick}
          >
            초기화
          </Button>
          <Button size="lg" variant="default" w="full" onClick={handleSaveButtonClick}>
            선택 완료
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
