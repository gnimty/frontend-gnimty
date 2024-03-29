import { describe, expect, test } from 'vitest';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import championIdKrNameMap from '@/apis/constants/championIdKrNameMap';
import champions from '@/apis/constants/champions';

describe('Ddragon champions snapshot testing', () => {
  test('championIdKrNameMap snapshot', () => {
    expect(championIdKrNameMap).toMatchSnapshot();
  });

  test('championIdEnNameMap snapshot', () => {
    expect(championIdEnNameMap).toMatchSnapshot();
  });

  test('champions snapshot', () => {
    expect(champions).toMatchSnapshot();
  });
});
