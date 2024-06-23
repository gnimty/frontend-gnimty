import type { ScheduleEntryTime } from '@/apis/types';

export default function scheduleEntryTimesToRaw(times: ScheduleEntryTime[]): boolean[] {
  const raw = Array.from({ length: 24 }, () => false);
  for (const time of times) {
    for (let i = time.startTime; i < time.endTime; i += 1) {
      raw[i] = true;
    }
  }
  return raw;
}
