import champions from './ddragon/champions';

const championIdKrNameMap: Record<number, string> = Object.values(champions).reduce(
  (accMap, champion) => ({ ...accMap, [champion.key]: champion.name }),
  {},
);

export default championIdKrNameMap;
