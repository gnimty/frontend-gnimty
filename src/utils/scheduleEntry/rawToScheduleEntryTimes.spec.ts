import { expect, test } from 'vitest';

import rawToScheduleEntryTimes from './rawToScheduleEntryTimes';

test('rawToScheduleEntryTimes()', () => {
  expect(
    rawToScheduleEntryTimes([
      ...Array.from({ length: 5 }).map(() => false),
      true,
      true,
      ...Array.from({ length: 17 }).map(() => false),
    ]),
  ).toStrictEqual([{ startTime: 5, endTime: 7 }]);

  expect(rawToScheduleEntryTimes([false, true, ...Array.from({ length: 22 }).map(() => false)])).toStrictEqual([
    { startTime: 1, endTime: 2 },
  ]);

  expect(
    rawToScheduleEntryTimes([
      false,
      true,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      ...Array.from({ length: 14 }).map(() => false),
    ]),
  ).toStrictEqual([
    { startTime: 1, endTime: 2 },
    { startTime: 6, endTime: 10 },
  ]);

  expect(rawToScheduleEntryTimes([...Array.from({ length: 23 }).map(() => false), true])).toStrictEqual([
    { startTime: 23, endTime: 24 },
  ]);

  expect(rawToScheduleEntryTimes([...Array.from({ length: 22 }).map(() => false), true, false])).toStrictEqual([
    { startTime: 22, endTime: 23 },
  ]);
});
