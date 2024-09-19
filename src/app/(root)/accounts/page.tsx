"use client";

import { RiBankCardLine } from "react-icons/ri";

import AccountCard2 from "@components/accounts/AccountCard2";
import Info from "@components/global/Info";
import Loader from "@components/global/Loader";

import useAccounts from "@hooks/useAccounts";

const Accounts = () => {
  const { accounts, loading } = useAccounts();
  // const accounts: IAccount[] = []

  return (
    <div className="">
      <div className="hidden md:block space-y-1 mb-8">
        <h2 className="text-xl lg:text-2xl font-bold">Overview</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          accounts at a glance.
        </p>
      </div>

      {loading && <Loader withContainer />}

      {!loading && !accounts?.length && (
        <Info
          icon={<RiBankCardLine />}
          title="No accounts yet"
          description="You don't have any account yet. When you create one, it will appear here."
        />
      )}

      {accounts?.length > 0 && (
        <div className="grid grid-cols-1 gap-5">
          {accounts?.map((account) => (
            <AccountCard2
              key={account._id}
              id={account._id}
              name={account.name}
              provider={account.provider}
              number={account.number}
              balance={account.balance}
              currency={account.currency}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Accounts;
