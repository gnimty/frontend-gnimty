import { Flex, Text } from '@chakra-ui/react';

interface TimeBadgeProps {
  startTime: number;
  endTime: number;
}
export default function TimeBadge({ startTime, endTime }: TimeBadgeProps) {
  return (
    <Flex borderRadius="full" border="1px solid" borderColor="gray800" bg="white" p="4px 12px">
      <Text textStyle="t2" fontWeight={400} userSelect="none">{`${startTime}시 ~ ${endTime}시`}</Text>
    </Flex>
  );
}
