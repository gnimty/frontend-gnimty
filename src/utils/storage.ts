export function getStorageItem<T>(key: string): T | null {
  const item = sessionStorage.getItem(key);
  if (item) {
    return JSON.parse(item) as T;
  }

  return null;
}

export function setStorageItem<T>(key: string, item: T) {
  sessionStorage.setItem(key, JSON.stringify(item));
}

export function removeStorageItem(key: string) {
  sessionStorage.removeItem(key);
}

export function extendStorageItem<T>(key: string, item: T) {
  const savedItem = getStorageItem<T[]>(key);
  sessionStorage.setItem(key, JSON.stringify([item, ...(savedItem ?? []).filter((s) => s !== item)]));
}
