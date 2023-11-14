export function getStorageItem<T>({ key, storage = sessionStorage }: { key: string; storage?: Storage }): T | null {
  const item = storage.getItem(key);
  if (item) {
    return JSON.parse(item) as T;
  }

  return null;
}

export function setStorageItem<T>({
  key,
  item,
  storage = sessionStorage,
}: {
  key: string;
  item: T;
  storage?: Storage;
}) {
  storage.setItem(key, JSON.stringify(item));
}

export function removeStorageItem({ key, storage = sessionStorage }: { key: string; storage?: Storage }) {
  storage.removeItem(key);
}

export function extendStorageItem<T>({
  key,
  item,
  storage = sessionStorage,
}: {
  key: string;
  item: T;
  storage?: Storage;
}) {
  const savedItem = getStorageItem<T[]>({ key, storage });
  storage.setItem(key, JSON.stringify([item, ...(savedItem ?? []).filter((s) => s !== item)]));
}
