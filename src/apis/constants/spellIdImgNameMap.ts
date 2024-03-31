import summonerSpells from './ddragon/summonerSpells';

const spellIdImgNameMap: Record<number, string> = Object.values(summonerSpells).reduce(
  (accMap, summonerSpell) => ({
    ...accMap,
    [summonerSpell.key]: summonerSpell.id,
  }),
  {},
);

export default spellIdImgNameMap;
