import type { ScheduleEntryTime } from '@/apis/types';

const MAX_START_TIME = 23;

export default function rawToScheduleEntryTimes(raw: boolean[]): ScheduleEntryTime[] {
  const scheduleEntryTimes: ScheduleEntryTime[] = [];

  // checked가 스트릭 내에서 처음 true일 때 현재 시간을 저장할 변수
  let startTime: number | undefined = undefined;
  raw.forEach((checked, currentTime) => {
    if (checked) {
      if (currentTime === MAX_START_TIME) {
        // 현재 시간이 마지막이기 때문에 다음 루프는 없으므로
        // 현재 시간을 endTime으로 삼아 push
        scheduleEntryTimes.push({
          // 만약 startTime이 undefined면 currentTime이 startTime임
          startTime: startTime ?? MAX_START_TIME,
          endTime: MAX_START_TIME + 1,
        });
        return;
      }

      if (startTime === undefined) {
        startTime = currentTime;
      }
    } else {
      if (startTime !== undefined) {
        scheduleEntryTimes.push({ startTime, endTime: currentTime });
        startTime = undefined;
      }
    }
  });

  return scheduleEntryTimes;
}
