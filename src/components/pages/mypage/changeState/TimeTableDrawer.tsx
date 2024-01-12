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
import { useEffect, useState } from 'react';

interface TimeTableDrawerProps {
  currentTimeData: number[];
  isOpen: boolean;
  onClose: () => void;
}
export default function TimeTableDrawer({ currentTimeData, isOpen, onClose }: TimeTableDrawerProps) {
  const [initialButtonState, setInitialButtonState] = useState<number[]>(currentTimeData);
  const [buttonState, setButtonState] = useState(initialButtonState);

  const resetTimeState = () => {
    setInitialButtonState(new Array(7).fill(0));
  };

  useEffect(() => {
    setButtonState(initialButtonState);
  }, [initialButtonState]);

  const [startAxis, setStartAxis] = useState<[number, number] | undefined>();

  const onMouseDown = (weekIndex: number, timeIndex: number) => {
    setStartAxis([weekIndex, timeIndex]);
  };

  const onMouseUp = () => {
    setStartAxis(undefined);
    setInitialButtonState(buttonState);
  };

  const onMouseOver = (weekIndex: number, timeIndex: number) => {
    if (startAxis) {
      const startState = initialButtonState[startAxis[0]] & (1 << startAxis[1]);
      const length = Math.abs(timeIndex - startAxis[1]) + 1;
      const mask = ((1 << length) - 1) << Math.min(timeIndex, startAxis[1]);

      const copyState = [...initialButtonState];

      const start = weekIndex < startAxis[0] ? weekIndex : startAxis[0];
      const end = weekIndex + startAxis[0] - start;

      for (let i = start; i <= end; i++) {
        copyState[i] = !startState ? copyState[i] | mask : copyState[i] & ~mask;
      }

      setButtonState(copyState);
    }
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
              gridGap="4px"
              onMouseUp={onMouseUp}
            >
              {[...Array(24).keys()].map((timeIndex) => {
                return [...Array(7).keys()].map((weekIndex) => {
                  return (
                    <GridItem
                      as={Button}
                      key={timeIndex * 24 + weekIndex}
                      onMouseDown={() => onMouseDown(weekIndex, timeIndex)}
                      onMouseOver={() => onMouseOver(weekIndex, timeIndex)}
                      bg={buttonState[weekIndex] & (1 << timeIndex) ? 'red800' : 'gray200'}
                    />
                  );
                });
              })}
            </GridItem>
          </Grid>
        </DrawerBody>
        <DrawerFooter gap="12px">
          <Button size="lg" variant="line" px="16px" textColor="gray500" fontWeight="400" onClick={resetTimeState}>
            초기화
          </Button>
          <Button size="lg" variant="default" w="full" onClick={onClose}>
            선택 완료
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
