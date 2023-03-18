import { useCallback, useEffect, useMemo, useState } from "react";
import { ObservableStorage } from "./ObservableStorage";

export function useStorage<T extends string>(
  storage: ObservableStorage,
  key: string,
  defaultValue?: T
) {
  const initial = useInitialValue(storage, key, defaultValue);
  const [state, setState] = useState(initial);

  useEffect(() => {
    setState(storage.get(key));
    const subscription = storage.subscribe(() => {
      setState(storage.get(key));
    });
    return () => subscription.unsubscribe();
  }, [storage, key]);

  const update = useCallback(
    (data?: string) => {
      if (data) {
        storage.set(key, data);
      } else {
        storage.remove(key);
      }
    },
    [storage, key]
  );

  return [state as T, update] as const;
}

export function useInitialValue<T extends string>(
  storage: ObservableStorage,
  key: string,
  defaultValue?: T
) {
  return useMemo(() => {
    const value = storage.get(key);
    if (value || defaultValue == null) {
      return value;
    }
    storage.set(key, defaultValue);
    return defaultValue;
  }, [storage, key, defaultValue]);
}
