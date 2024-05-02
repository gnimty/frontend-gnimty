import items from './ddragon/items';

const itemIdKrNameMap: Record<number, string> = {};

for (const [itemId, item] of Object.entries(items)) {
  itemIdKrNameMap[Number(itemId)] = item.name;
}

export default itemIdKrNameMap;
