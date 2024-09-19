import Link from "next/link";


import { useSession } from "next-auth/react";

const CategoryCard = ({ budgetId, item, handleBalance }) => {

  // Get session.
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  return (
    <Link
      href={{ pathname: `/budgets/categories/${item.categoryID}`, query: { budgetId } }}
      className={`rounded-2xl hover:bg-neutral-200/50
    dark:hover:bg-neutral-800/50 flex sm:items-center p-5 mb-12 border border-neutral-200 `}

    >
      <div
        className={`sm:text-base sm:font-medium flex sm:justify-between w-full flex-col sm:flex-row border-neutral-200`}
      >
        <p className="text-lg sm:text-base sm:w-[238px] capitalize mb-2">{item.category}</p>
        <p className="text-xs hidden sm:block sm:text-base sm:w-[238px]">{item.budgetedAmount}</p>
        <p className="text-xs  hidden sm:block sm:text-base sm:w-[238px]">{handleBalance(item)}</p>

        <div className="flex justify-between sm:hidden">
          <p className="flex-col flex justify-between">
            <span className="sm:hidden text-xs mb-1">Budgeted Amount</span>
            <span className="text-base sm:w-[238px] text-primary font-bold">{item.budgetedAmount}</span>
          </p>
          <p className="flex-col flex justify-between">
            <span className="sm:hidden text-xs mb-1">Amount Available</span>
            <span className="sm:text-base sm:w-[238px] text-primary">{handleBalance(item)}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
