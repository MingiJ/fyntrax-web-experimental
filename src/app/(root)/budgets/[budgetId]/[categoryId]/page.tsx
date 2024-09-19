"use client"
import Loader from '@components/global/Loader'
import Modal from '@components/global/Modal'
import AddTransaction from '@components/transactions/AddTransaction'
import { useSession } from 'next-auth/react'
import React from 'react'
import { RiAddLine, RiDeleteBin6Line, RiEditLine } from 'react-icons/ri'
import { useSearchParams } from 'next/navigation'
import { useListBudgetCategoriesQuery, useListBudgetCategoryTransactionsQuery } from '@services/budget'
import formatCurrency from '@utils/formatCurrency'
import TxAlt from '@components/transactions/TxAlt'

const Categories = ({ params }) => {
  const categoryId = params.categoryId
  const searchParams = useSearchParams()
  const budgetId = searchParams.get("budgetId")
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;
  const { isLoading: categoriesLoading, data: categories } = useListBudgetCategoryTransactionsQuery({
    accessToken,
    query: { budgetId, categoryId }
  })


  return (
    <div className=" mx-4 mt-16 ">
      {/* *********** ADD TRANSACTION *********** */}
      {categoriesLoading && <Loader withContainer />}
      {!categoriesLoading && categories && (
        <div className='w-full'>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-8">
            <Modal
              renderOpener={(openModal: any) => (
                <button className="btn-outline" onClick={openModal}>
                  <i>
                    <RiAddLine />
                  </i>
                  Add Transaction
                </button>
              )}
              renderChildren={(closeModal: any) => (
                <AddTransaction budgetId={budgetId} budgetName={categories.items[0].name} closeModal={closeModal} type='expense' />
              )}
            />
          </div>
          <div className='w-full flex justify-between mb-8'>
            <p className='capitalize text-xl sm:text-3xl font-bold'>{categories.items[0].category}</p>
            <p className='capitalize sm:text-3xl text-xl font-bold text-primary'>{formatCurrency(categories.items[0].budgetedAmount)}</p>

          </div>

          <div className="sm:bg-border sm:p-7 rounded-2xl">
            <p className='font-bold mb-9'>Transactions</p>
            <div className='space-y-5'>
              {
                categories.items[0].budgetTransactions.map(tx => (
                  <TxAlt
                    key={tx._id}
                    id={tx._id}
                    title={tx.title}
                    amount={tx.amount}
                    currency={tx.currency}
                    type={tx.type}
                    category={{name: categories.items[0].category}}
                    date={tx.date}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Categories 
