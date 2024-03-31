import perkInformationList from './ddragon/perkInformationList';

const perkIdImgLinkMap: Record<number, string> = {};

for (const perkInformation of perkInformationList) {
  for (const perkSlot of perkInformation.slots) {
    for (const perk of perkSlot.runes) {
      perkIdImgLinkMap[perk.id] = perk.icon;
    }
  }
}

export default perkIdImgLinkMap;
