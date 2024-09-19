import TxAlt from "../TxAlt"

import { TxGroupProps } from "./types"

const TxGroup = ({
  name,
  transactions
}: TxGroupProps) => {
  return (
    <div className="space-y-5">
      <h3 className="font-semibold text-neutral-500 dark:text-neutral-400 text-xs">
        {name}
      </h3>

      <div className="space-y-5">
        {transactions.map(tx => (
          <TxAlt
            key={tx._id}
            id={tx._id}
            title={tx.title}
            category={tx.category}
            type={tx.type}
            amount={tx.amount}
            currency={tx.currency}
          />
        ))}
      </div>
    </div>
  )
}

export default TxGroup