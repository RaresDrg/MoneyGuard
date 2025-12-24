import { useEffect } from "react";
import { useSessionStorage } from ".";
import { transactionsService } from "../services";
import { handleRequestFlow } from "../utils";

type Categories = {
  income: Array<string>;
  expense: Array<string>;
};

const useCategories = () => {
  const { data, updateStorage } = useSessionStorage<Categories>("categories");

  async function fetchData() {
    handleRequestFlow({
      request: () => transactionsService.fetchCategories(),
      onSuccess: (res) =>
        updateStorage(res.data, {
          expiresAt: Date.now() + 1000 * 60 * 60 * 24,
        }),
    });
  }

  useEffect(() => {
    if (!data) fetchData();
  }, []);

  return {
    expenseCategories: data?.expense || [],
    incomeCategories: data?.income || [],
  };
};

export default useCategories;
