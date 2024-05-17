const groupBy = <K extends PropertyKey, T>(
  items: T[],
  keySelector: (item: T, index: number) => K,
): Partial<Record<K, T[]>> =>
  items.reduce(
    (acc, item, index) => {
      const key = keySelector(item, index);
      acc[key] ??= [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<K, T[]>,
  );

export default groupBy;
