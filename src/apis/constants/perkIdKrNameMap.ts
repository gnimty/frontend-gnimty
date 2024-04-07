import perkInformationList from './ddragon/perkInformationList';

const perkIdKrNameMap: Record<number, string> = {};

for (const perkInformation of perkInformationList) {
  for (const perkSlot of perkInformation.slots) {
    for (const perk of perkSlot.runes) {
      perkIdKrNameMap[perk.id] = perk.name;
    }
  }
}

export default perkIdKrNameMap;
