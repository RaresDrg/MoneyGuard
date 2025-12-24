import { useState } from "react";
import { useReduxState, useEffectAfterMount } from ".";

export const useLocalStorage = <T>(key: string) =>
  useStorage<T>(key, localStorage);
export const useSessionStorage = <T>(key: string) =>
  useStorage<T>(key, sessionStorage);

type StorageData<T> = {
  data: T;
  meta: {
    owner: string | null;
    expiresAt: number | null;
  };
};

function useStorage<T>(key: string, storageObject: Storage) {
  const userEmail = useReduxState("selectUserEmail");

  const [storageData, setStorageData] = useState<StorageData<T> | null>(() => {
    try {
      const rawData = storageObject.getItem(key);
      if (!rawData) return null;

      const { data, meta } = JSON.parse(rawData);
      if (
        (meta.owner && meta.owner !== userEmail) ||
        (meta.expiresAt && meta.expiresAt < Date.now())
      ) {
        throw new Error();
      }

      return { data, meta };
    } catch {
      storageObject.removeItem(key);
      return null;
    }
  });

  useEffectAfterMount(() => {
    if (storageData === null) storageObject.removeItem(key);
    else storageObject.setItem(key, JSON.stringify(storageData));
  }, [key, storageData]);

  function updateStorage(
    data: T,
    options: { assignToUser?: boolean; expiresAt?: number } = {}
  ) {
    setStorageData({
      data,
      meta: {
        owner: options.assignToUser && userEmail ? userEmail : null,
        expiresAt: options.expiresAt ?? null,
      },
    });
  }

  function clearStorage() {
    setStorageData(null);
  }

  return {
    data: storageData?.data ?? null,
    meta: storageData?.meta ?? { owner: null, expiresAt: null },
    updateStorage,
    clearStorage,
  };
}
