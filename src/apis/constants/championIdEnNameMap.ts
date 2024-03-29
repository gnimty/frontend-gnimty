import champions from './ddragon/champions';

// TODO: 나중에 혼동하지 않게 변수 이름을 `championIdEnIdMap` 으로 변경
const championIdEnNameMap: Record<number, string> = Object.values(champions).reduce(
  (accMap, champion) => ({ ...accMap, [champion.key]: champion.id }),
  {},
);

export default championIdEnNameMap;
