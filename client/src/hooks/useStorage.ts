import { useCallback, useEffect, useState } from "react";

const useLocalStorage = <T>(key: string) => useStorage<T>(key, localStorage);
const useSessionStorage = <T>(key: string) =>
  useStorage<T>(key, sessionStorage);

type Return<T> = readonly [
  T | null,
  React.Dispatch<React.SetStateAction<T | null>>,
  () => void
];

function useStorage<T>(key: string, storageObject: Storage): Return<T> {
  const [value, setValue] = useState<T | null>(() => {
    try {
      const jsonValue = storageObject.getItem(key);
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (value !== null) {
      storageObject.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  const remove = useCallback(() => {
    storageObject.removeItem(key);
    setValue(null);
  }, [key]);

  return [value, setValue, remove] as const;
}

export { useLocalStorage, useSessionStorage };
