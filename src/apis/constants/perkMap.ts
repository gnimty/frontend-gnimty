import perkInformationList from './ddragon/perkInformationList';

export const perkMap: Record<number, [number[], number[], number[], number[]]> = perkInformationList.reduce(
  (accMap, perkInformation) => ({
    ...accMap,
    [perkInformation.id]: perkInformation.slots.map((perkSlot) => perkSlot.runes.map((rune) => rune.id)),
  }),
  {},
);

export const perkNameMap: Record<number, string> = perkInformationList.reduce(
  (accMap, perkInformation) => ({ ...accMap, [perkInformation.id]: perkInformation.name }),
  {},
);
