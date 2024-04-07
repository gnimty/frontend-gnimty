import summonerSpells from './ddragon/summonerSpells';

const spellIdKrNameMap: Record<number, string> = Object.values(summonerSpells).reduce(
  (accMap, summonerSpell) => ({
    ...accMap,
    [summonerSpell.key]: summonerSpell.name,
  }),
  {},
);

export default spellIdKrNameMap;
