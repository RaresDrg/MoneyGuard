import { useEffect } from "react";
import { useSessionStorage } from ".";
import { transactionsService } from "../services";

type Categories = {
  income: Array<string>;
  expense: Array<string>;
};

const useCategories = () => {
  const [storageData, setStorageData] =
    useSessionStorage<Categories>("categories");

  async function fetchData() {
    try {
      const res = await transactionsService.fetchCategories();
      setStorageData({
        payload: res.data,
        owner: null,
        expiresAt: Date.now() + 1000 * 60 * 60 * 24,
      });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  useEffect(() => {
    if (!storageData) fetchData();
  }, []);

  return {
    expenseCategories: storageData?.payload.expense || [],
    incomeCategories: storageData?.payload.income || [],
  };
};

export default useCategories;
