import Link from "next/link";

import { BudgetCardProps } from "./types";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useListTransactionsQuery } from "@services/transactions";
import formatCurrency from "@utils/formatCurrency";

const BudgetCard = ({ id, ratioSpent, amountSpent, name, totalAmount }: BudgetCardProps) => {
  const percentageSpent = Math.ceil(ratioSpent * 100)
  const isActive = usePathname()?.split("/").pop() === id;
  amountSpent = formatCurrency(amountSpent)
  totalAmount = formatCurrency(totalAmount)
  // Get session.
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;


  return (
    <Link
      href={`/budgets/${id}`}
      className={`rounded-2xl hover:bg-neutral-200/50
    dark:hover:bg-neutral-800/50 flex items-center p-5 ${isActive && "bg-neutral-200/50 dark:bg-neutral-800/50"
        }`}
    >
      <div className="space-y-5 w-full">
        <div className="flex justify-between w-full sm:w-1/2 ">
          <h4
            className={`capitalize text-sm font-medium ${isActive
              ? "text-black dark:text-white"
              : "text-neutral-600 dark:text-neutral-400"
              }`}
          >
            {name}
          </h4>
          <p className="sm:hidden">{percentageSpent}%</p>
        </div>
        <div className="sm:w-1/2 bg-[#EAEAEA] h-5 rounded-3xl">
          <div className={` bg-primary-alt h-full rounded-3xl`} style={{ width: `${percentageSpent}%` }}></div>
        </div> <div className="flex justify-between sm:w-1/2">
          <div className="text-xl sm:text-4xl text-primary flex space-x-3">
            <p>{amountSpent}</p>
            <p className="text-xs sm:text-base text-[#7c7c7c]">/ {totalAmount}</p>
          </div>
          <div className="hidden sm:block">
            <p>{percentageSpent}%</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BudgetCard;
