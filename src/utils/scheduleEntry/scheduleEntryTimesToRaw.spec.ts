import { expect, test } from 'vitest';

import scheduleEntryTimesToRaw from './scheduleEntryTimesToRaw';

test('scheduleEntryTimesToRaw()', () => {
  expect(scheduleEntryTimesToRaw([{ startTime: 5, endTime: 7 }])).toStrictEqual([
    ...Array.from({ length: 5 }, () => false),
    true,
    true,
    ...Array.from({ length: 17 }, () => false),
  ]);

  expect(scheduleEntryTimesToRaw([{ startTime: 1, endTime: 2 }])).toStrictEqual([
    false,
    true,
    ...Array.from({ length: 22 }, () => false),
  ]);

  expect(
    scheduleEntryTimesToRaw([
      { startTime: 1, endTime: 2 },
      { startTime: 6, endTime: 10 },
    ]),
  ).toStrictEqual([
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
    ...Array.from({ length: 14 }, () => false),
  ]);

  expect(scheduleEntryTimesToRaw([{ startTime: 23, endTime: 24 }])).toStrictEqual([
    ...Array.from({ length: 23 }, () => false),
    true,
  ]);

  expect(scheduleEntryTimesToRaw([{ startTime: 22, endTime: 23 }])).toStrictEqual([
    ...Array.from({ length: 22 }, () => false),
    true,
    false,
  ]);
});
