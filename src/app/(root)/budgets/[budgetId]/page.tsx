"use client";
import ButtonWithLoader from "@components/global/ButtonWithLoader";
import ErrorMsg from "@components/global/ErrorMsg";
import Loader from "@components/global/Loader";
import Modal from "@components/global/Modal";
import { useListCategoriesQuery } from "@services/category";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  RiAddLine,
  RiArrowLeftLine,
  RiCloseCircleLine,
  RiDeleteBin6Line,
  RiEditLine,
} from "react-icons/ri";
import AddBudgetCategory from "@components/budgets/AddBudgetCategory";
import { useListTransactionsQuery } from "@services/transactions";
import { useListBudgetCategoryTransactionsQuery } from "@services/budget";
import CategoryCard from "@components/budgets/CategoryCard";

const Budget = ({ params }: any) => {
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const budgetId = params.budgetId;
  //
  // Get session.
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  // Get budgets
  const { isLoading: categoriesLoading, data: categories } = useListBudgetCategoryTransactionsQuery({
    accessToken,
    query: { budgetId }
  })

  // Get budgets
  const { isLoading: transactionsLoading, data: transactions } = useListTransactionsQuery({
    accessToken
  })

  const calculateBudgetCategoryBalance = (item: any) => {
    const transactionTotal = item?.budgetTransactions.reduce((acc, curr) => acc + curr.amount, 0)
    const amountAvailable = item?.budgetedAmount - transactionTotal
    return amountAvailable
  }

  const { isLoading: categoryLoading, data: categoryData } =
    useListCategoriesQuery({
      accessToken,
    });

  return (
    <>
      {transactionsLoading ? (
        <Loader withContainer />
      ) : (
        <div className="mt-16 mx-4">
          {/* *********** LINK TO OVERVIEW *********** */}
          <div className="">
            <Link
              href="/budgets"
              className="flex items-center gap-2 text-primary-alt text-sm mb-10 "
            >
              <RiArrowLeftLine />
              Overview
            </Link>
          </div>
          {categoryLoading && <Loader withContainer />}
          {!categoryLoading && categoryData && (
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-8">
              <Modal
                renderOpener={(openModal: any) => (
                  <button className="btn-outline" onClick={openModal}>
                    <RiAddLine className="text-primary-alt text-base" />
                    <span className="font-medium">Add category</span>
                  </button>
                )}
                renderChildren={(closeModal: any) => (
                  <AddBudgetCategory id={budgetId} closeModal={closeModal} />
                )}
              />

              <div className="flex flex-col gap-2 sm:flex-row">
                {/* *********** EDIT CATEGORY *********** */}
                <Modal
                  renderOpener={(openModal: any) => (
                    <button className="btn-outline" onClick={openModal}>
                      <i>
                        <RiEditLine />
                      </i>
                      edit
                    </button>
                  )}
                  renderChildren={(closeModal: any) => (
                    <AddBudgetCategory
                      closeModal={closeModal}
                      edit
                    />
                  )}
                />

                {/* *********** DELETE CATEGORY *********** */}
                <Modal
                  renderOpener={(openModal: any) => (
                    <button className="btn-outline" onClick={openModal}>
                      <i>
                        <RiDeleteBin6Line className="text-red-500" />
                      </i>
                      delete
                    </button>
                  )}
                  renderChildren={(closeModal: any) => (
                    <div className="space-y-5">
                      <h2 className="title">Delete category?</h2>

                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        This category and all its transactions will be
                        deleted.
                        Continue?
                      </p>

                      {deleteError && <ErrorMsg msg={deleteError} />}

                      <div className="flex items-center gap-2">
                        <ButtonWithLoader
                          type="button"
                          className="btn btn-danger"
                          isLoading={isSubmitted}
                        // onClick={() => handleDelete( closeModal)}
                        >
                          <i>
                            <RiDeleteBin6Line />
                          </i>
                          delete
                        </ButtonWithLoader>

                        <button
                          onClick={closeModal}
                          type="button"
                          className="btn-outline"
                        >
                          <i>
                            <RiCloseCircleLine />
                          </i>
                          cancel
                        </button>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          )}
          <div className="hidden sm:flex justify-between text-primary text-sm p-5">
            <p className="w-[238px]">Category</p>
            <p className="w-[238px]">Budgeted</p>
            <p className="w-[238px]">Available</p>
          </div>
          <div className="mt-8">
            {categories?.items?.map((category) => (
              <CategoryCard budgetId={budgetId} handleBalance={calculateBudgetCategoryBalance} item={category} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Budget;
