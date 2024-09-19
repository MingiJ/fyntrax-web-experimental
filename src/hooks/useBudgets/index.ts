"use client";

import { useCallback } from "react";
import { useSession } from "next-auth/react";

import BudgetService from "@services/BudgetService";

import useFetch from "@hooks/useFetch";

const useBudgets = () => {
  // Get session.
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  const getBudgets = async () => {
    const { budgets } = await BudgetService.list({ accessToken });
    const budget = budgets.pop();
    const result = await BudgetService.fetch({ id: budget._id, accessToken });
    return result;
  };

  const { data, loading } = useFetch(getBudgets, { accessToken });

  return {
    budgetData: data?.transactions,
    loading,
  };
};

export default useBudgets;
