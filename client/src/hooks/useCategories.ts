import { useEffect } from "react";
import { useSessionStorage } from ".";
import { categoriesService } from "../services";

type Categories = {
  income: Array<string>;
  expense: Array<string>;
};

const useCategories = () => {
  const [categories, setCategories] =
    useSessionStorage<Categories>("categories");

  async function fetchData() {
    try {
      const res = await categoriesService.fetchCategories();
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  useEffect(() => {
    if (!categories) fetchData();
  }, []);

  return {
    expenseCategories: categories?.expense || [],
    incomeCategories: categories?.income || [],
  };
};

export default useCategories;
