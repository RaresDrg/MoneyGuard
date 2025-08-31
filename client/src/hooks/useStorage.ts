import { useState } from "react";
import { useAuth, useEffectAfterMount } from ".";

const useLocalStorage = <T>(key: string) => useStorage<T>(key, localStorage);
const useSessionStorage = <T>(key: string) =>
  useStorage<T>(key, sessionStorage);

type StorageData<T> = {
  payload: T;
  owner: string | null;
  expiresAt: number | null;
};

function useStorage<T>(key: string, storageObject: Storage) {
  const { user } = useAuth();

  const [storageData, setStorageData] = useState<StorageData<T> | null>(() => {
    try {
      const rawData = storageObject.getItem(key);
      if (!rawData) return null;

      const { payload, owner, expiresAt } = JSON.parse(rawData);

      if (
        (owner && owner !== user?.email) ||
        (expiresAt && expiresAt < Date.now())
      ) {
        storageObject.removeItem(key);
        return null;
      }

      return { payload, owner, expiresAt };
    } catch {
      storageObject.removeItem(key);
      return null;
    }
  });

  useEffectAfterMount(() => {
    if (storageData === null) {
      storageObject.removeItem(key);
    } else {
      storageObject.setItem(key, JSON.stringify(storageData));
    }
  }, [key, storageData]);

  return [storageData, setStorageData] as const;
}

export { useLocalStorage, useSessionStorage };
