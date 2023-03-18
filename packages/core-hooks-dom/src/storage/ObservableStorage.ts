type BaseStorage = Pick<Storage, "setItem" | "getItem" | "removeItem">;

export function createObservableStorage(storage: BaseStorage) {
  const listeners: Function[] = [];
  const subscribe = (listener: () => void) => {
    listeners.push(listener);
    return {
      unsubscribe: () => {
        listeners.splice(listeners.indexOf(listener), 1);
      },
    };
  };

  return {
    get: (key: string) => storage.getItem(key),
    set: (key: string, val: string) => {
      storage.setItem(key, val);
      listeners.forEach((listener) => listener());
    },
    remove: (key: string) => {
      storage.removeItem(key);
      listeners.forEach((listener) => listener());
    },
    subscribe,
  };
}

export type ObservableStorage = ReturnType<typeof createObservableStorage>;
