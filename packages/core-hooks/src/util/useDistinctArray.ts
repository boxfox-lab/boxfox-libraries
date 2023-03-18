import { uniq } from "lodash";
import { useCallback, useMemo, useState } from "react";

export function useDistinctArray<T>(defaultValue: T[] = []) {
  const [value, setState] = useState(defaultValue);
  const add = useCallback((...items: T[]) => {
    setState((prev) => [
      ...prev.filter((item) => !items.includes(item)),
      ...items,
    ]);
  }, []);
  const remove = useCallback((...items: T[]) => {
    setState((prev) => prev.filter((item) => !items.includes(item)));
  }, []);
  const set = useCallback((...items: T[]) => {
    setState(uniq(items));
  }, []);
  const clear = useCallback(() => {
    setState([]);
  }, []);

  return useMemo(() => ({ value, add, remove, set, clear }), [
    value,
    add,
    remove,
    set,
    clear,
  ]);
}
