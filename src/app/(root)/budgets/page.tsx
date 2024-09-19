"use client";
import {
  RiAddLine,
  RiCalculatorLine,
} from "react-icons/ri";

import Info from "@components/global/Info";
import Modal from "@components/global/Modal";
import { useState } from "react";
import { IBudget } from "@utils/interfaces";
import { useAlertContext } from "@contexts/AlertContext";
import { useSession } from "next-auth/react";
import { useListCategoriesQuery } from "@services/category";
import Loader from "@components/global/Loader";
import BudgetCard from "@components/budgets/BudgetListCard";
import AddBudget from "@components/budgets/AddBudget";
import { useCreateBudgetMutation, useListBudgetsQuery } from "@services/budget";

const Budgets = () => {

  // Get session.
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  // Get categories.
  const { isLoading: categoryLoading, data: categoryData } =
    useListCategoriesQuery({
      accessToken,
    });

  //Budget API

  const { isLoading: budgetsLoading, data: budget } =
    useListBudgetsQuery({
      accessToken,
    });


  const [createBudget] = useCreateBudgetMutation();

  return (
    <section className="space-y-8">
      <h1 className="title">Your Budgets</h1>
      <div className="h-max">
        {categoryLoading && <Loader withContainer />}
        {!categoryLoading && categoryData && (
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-8">
            <Modal
              renderOpener={(openModal: any) => (
                <button className="btn-outline" onClick={openModal}>
                  <i>
                    <RiAddLine />
                  </i>
                  Add Budget
                </button>
              )}
              renderChildren={(closeModal: any) => (
                <AddBudget closeModal={closeModal} />
              )}
            />
          </div>
        )}

        {budgetsLoading && <Loader withContainer />}

        {!budgetsLoading && !budget?.items.length && (
          <Info
            icon={<RiCalculatorLine />}
            title="No budget yet"
            description="You don't have any budget yet. When you create one, it will appear here."
          />
        )}

        {budget?.items?.length > 0 && (
          <div className=" rounded-2xl h-max space-y-10 sm:w-[1280px]">
            {budget?.items.map((budget: IBudget) => (
              <BudgetCard
                id={budget._id}
                name={budget.name}
                totalAmount={budget.totalAmount}
                amountSpent={budget.amountSpent}
                ratioSpent={budget.ratioSpent}
                key={budget._id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Budgets;
