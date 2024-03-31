import { describe, expect, test } from 'vitest';

import spellIdImgNameMap from '@/apis/constants/spellIdImgNameMap';
import spellIdKrNameMap from '@/apis/constants/spellIdKrNameMap';

describe('Ddragon summonerSpells snapshot testing', () => {
  test('spellIdImgNameMap snapshot', () => {
    expect(spellIdImgNameMap).toMatchSnapshot();
  });

  test('spellIdKrNameMap snapshot', () => {
    expect(spellIdKrNameMap).toMatchSnapshot();
  });
});
