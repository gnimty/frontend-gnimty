import { describe, expect, test } from 'vitest';

import perkIdImgLinkMap from '@/apis/constants/perkIdImgLinkMap';
import perkIdKrNameMap from '@/apis/constants/perkIdKrNameMap';
import { perkMap, perkNameMap } from '@/apis/constants/perkMap';

describe('Ddragon perkInformationList snapshot testing', () => {
  test('perkIdKrNameMap snapshot', () => {
    expect(perkIdKrNameMap).toMatchSnapshot();
  });

  test('perkIdImgLinkMap snapshot', () => {
    expect(perkIdImgLinkMap).toMatchSnapshot();
  });

  test('perkMap snapshot', () => {
    expect(perkMap).toMatchSnapshot();
  });

  test('perkNameMap snapshot', () => {
    expect(perkNameMap).toMatchSnapshot();
  });
});
