import Link from "next/link";
import { RiMore2Line } from "react-icons/ri";

import { AccountCardProps } from "./types";

import { getIcon } from "@utils/getIcon";

const AccountCard = ({
  id,
  name,
  number,
  balance,
  provider,
  currency
}: AccountCardProps) => {
  return (
    <Link href={`/accounts/${id}`} className="bg-border rounded-2xl p-5 space-y-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-sm sm:text-base">{name}</h4>
        </div>
        
        {number && <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">{number}</p>}

        {/* <button className="icon-btn">
          <RiMore2Line />
        </button> */}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-3xl text-primary-alt">
          {getIcon(provider)}
        </span>

        <div className="text-end">
          <p className="text-2xl font-bold">{balance.toLocaleString()}</p>
          <p className="text-xs uppercase text-neutral-500 dark:text-neutral-400 font-semibold">{currency}</p>
        </div>
      </div>
    </Link>
  )
}

export default AccountCard