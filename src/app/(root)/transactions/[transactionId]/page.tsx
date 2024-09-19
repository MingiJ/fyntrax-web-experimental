'use client'

import { useState, useEffect, useContext } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { format } from "date-fns"
import {
  RiArrowDownLine,
  RiArrowRightCircleLine,
  RiArrowUpLine,
  RiCloseCircleLine,
  RiDeleteBin6Line,
  RiDownloadCloud2Line,
  RiEditLine,
  RiFileList3Line,
  RiImage2Line
} from "react-icons/ri"

import Loader from "@components/global/Loader"
import Info from "@components/global/Info"
import Modal from "@components/global/Modal"
import ButtonWithLoader from "@components/global/ButtonWithLoader"
import ErrorMsg from "@components/global/ErrorMsg"
import AddTransaction from "@components/transactions/AddTransaction"
import KPICardAlt from "@components/global/KPICardAlt"

import { AlertContext } from "@contexts/AlertContext"

import { IAccount, ITransaction } from "@utils/interfaces"
import { getIcon } from "@utils/getIcon"

import TxService from "@services/TxService"

const Transaction = ({
  params: { transactionId },
  searchParams
}: any) => {
  const [transaction, setTransaction] = useState<ITransaction | null>(null)
  const [loading, setLoading] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Get push.
  const { push } = useRouter()

  // Get alert context.
  const { setAlert } = useContext(AlertContext)

  // Get session.
  const { data: session } = useSession()
  const accessToken = session?.user.accessToken as string

  // Handle delete.
  const handleDelete = async (id: string, closeModal: Function) => {
    setIsSubmitted(true)

    const res = await TxService.remove({
      id,
      accessToken
    })

    if (!res.ok) {
      setIsSubmitted(false)
      setDeleteError(res.message)
      return
    }

    setIsSubmitted(false)
    closeModal()
    push('/transactions')
  }

  useEffect(() => {
    async function getAccount() {
      setLoading(true)

      const res = await TxService.fetch({
        id: transactionId,
        accessToken
      })
    
      if (!res.ok) {
        setLoading(false)
        setAlert({
          msg: res.message,
          type: 'error',
          show: true
        })
        return
      }
    
      setTransaction(res.transaction)
      setLoading(false)
    }

    if (accessToken) {
      getAccount()
    }
  }, [accessToken, transactionId, setAlert])

  const selectColor = (type: string) => {
    if (type === 'income') {
      return 'text-green-500'
    }

    if (type === 'expense') {
      return 'text-red-600'
    }

    return 'text-primary'
  }

  const selectIcon = (type: string) => {
    if (type === 'expense') {
      return <RiArrowUpLine />
    }
    
    if (type === 'income') {
      return <RiArrowDownLine />
    }

  }

  return (
    <section className="space-y-8">
      {loading ? <div className="py-8"><Loader withContainer /></div> :
        transaction && 
          <>
            {/* *********** HEADER *********** */}
            <div className="flex flex-col xs:flex-row xs:items-center gap-8 xs:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-border
                text-primary-alt text-3xl">
                  <RiFileList3Line />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <h1 className="text-lg xl:text-2xl font-bold">{transaction.title}</h1>

                  <div className="flex items-center gap-4">
                    {transaction?.date &&
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {format(new Date(transaction.date), 'MMM dd, yyy')}
                      </p>
                    }
                    <div className={`px-2 py-1 bg-border rounded-full ${transaction.type === 'income' ? 'text-green-500' : 'text-red-600'}
                    text-xs font-medium capitalize`}>
                      {transaction.type}
                    </div>
                  </div>
                </div>
              </div>

              <div className="xs:text-end">
                <div className="flex gap-2">
                  <div className={`${selectColor(transaction.type)} text-xs sm:text-sm mt-1`}>
                    {selectIcon(transaction.type)}
                  </div>

                  <div className="text-2xl xl:text-4xl font-bold">
                    <span className={selectColor(transaction.type)}>{transaction.amount.toLocaleString().split('.')[0]}</span>
                    <span className="text-neutral-400">.{transaction.amount.toLocaleString().split('.')[1] || '00'}</span>
                  </div>
                </div>

                <p className="text-[10px] sm:text-sm font-semibold text-primary dark:text-primary-alt uppercase">
                  {transaction.currency}
                </p>
              </div>
            </div>

            {/* *********** CONTROLS *********** */}
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <div className="flex flex-col gap-2 sm:flex-row">
                <Modal
                  renderOpener={(openModal: any) => (
                    <button className="btn-outline" onClick={openModal}>
                      <i><RiEditLine /></i>
                      edit
                    </button>
                  )}
                  renderChildren={(closeModal: any) => (
                    <AddTransaction edit id={transactionId} closeModal={closeModal} type={transaction.type} />
                  )}
                />
                
                <Modal
                  renderOpener={(openModal: any) => 
                    <button className="btn-outline" onClick={openModal}>
                      <i><RiDeleteBin6Line className="text-red-500" /></i>
                      delete
                    </button>
                  }
                  renderChildren={(closeModal: any) => (
                    <div className="space-y-5">
                      <h2 className="title">Delete transaction?</h2>

                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        This transaction will be permanently deleted and will not be recoverable. Continue?
                      </p>

                      {deleteError && <ErrorMsg msg={deleteError} />}

                      <div className="flex items-center gap-2">
                        <ButtonWithLoader
                          type="button"
                          className="btn btn-danger"
                          isLoading={isSubmitted}
                          onClick={() => handleDelete(transactionId, closeModal)}
                        >
                          <i><RiDeleteBin6Line /></i>
                          delete
                        </ButtonWithLoader>

                        <button onClick={closeModal} type="button" className="btn-outline">
                          <i><RiCloseCircleLine /></i>
                          cancel
                        </button>
                      </div>
                    </div>
                  )}
                />
              </div>

              <button className="btn-outline">
                <i><RiDownloadCloud2Line /></i>
                download as PDF
              </button>
              {/* <Link href='/transactions/new' className="btn-outline">
                <i><RiAddLine /></i>
                add transaction
              </Link> */}
            </div>

            {/* *********** SEP *********** */}
            <hr className="border-neutral-200 dark:border-neutral-800" />

            {/* *********** CONTENT *********** */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* *********** LEFT *********** */}
              <div className="space-y-8">
                {/* *********** DESCRIPTION *********** */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Description</h3>

                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {transaction.description || 'No description added.'}
                  </p>
                </div>

                <hr className="border-neutral-200 dark:border-neutral-800" />

                {/* *********** ACCOUNT *********** */}
                {transaction.account ?
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center justify-center w-14 h-14 xl:w-16 xl:h-16 rounded-full bg-border
                    text-primary-alt text-2xl">
                      {/* @ts-ignore */}
                      {getIcon(transaction.account.provider)}
                    </div>

                    <div className="flex items-center justify-between flex-1">
                      <div className="space-y-1">
                        {/* @ts-ignore */}
                        <h4 className="text-sm font-semibold">{transaction.account.name}</h4>

                        <div className="flex items-center gap-2">
                          {/* @ts-ignore */}
                          {transaction.account?.number && <p className="text-xs text-neutral-500 dark:text-neutral-400">{transaction.account.number}</p>}
                          {/* @ts-ignore */}
                          {transaction.account?.provider && <div className="px-2 py-1 bg-border rounded-full text-xs font-medium capitalize">{transaction.account.provider}</div>}
                        </div>
                      </div>

                      {/* @ts-ignore */}
                      <Link href={`/accounts/${transaction.account?._id}`} className="!hidden sm:!flex btn-outline">
                        <i><RiArrowRightCircleLine /></i>
                        view account
                      </Link>
                    </div>
                  </div>
                :
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold">Account</h3>

                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      This transaction is not linked to any account.
                    </p>
                  </div>
                }

                {/* <hr className="border-neutral-200 dark:border-neutral-800" /> */}

                
              </div>

              {/* *********** RIGHT *********** */}
              <div className="flex flex-col gap-5">
                {/* *********** COSTS *********** */}
                <div className="space-y-5">
                  {/* <h3 className="text-sm font-semibold">Transaction Cost</h3> */}
                  
                  {transaction.cost ?
                    <KPICardAlt
                      amount={transaction.cost}
                      name="Transaction fee"
                      show
                      type="expense"
                      currency={transaction.currency}
                    /> :
                    <Info
                      icon={<RiFileList3Line />}
                      title='No cost added'
                      description="Transaction cost will appear here."
                      className='h-full'
                    />
                  }
                </div>

                {/* <h3 className="text-sm font-semibold">Receipts</h3>

                <Info
                  icon={<RiImage2Line />}
                  title='No receipts added yet'
                  description="Your receipt images will show here."
                  className='flex-1'
                /> */}
              </div>
            </div>
          </>
        // : 
        //   <Info
        //     icon={<RiFileList3Line />}
        //     title='Oops, not found'
        //     description="This transaction was not found. You might have deleted it."
        //   />
      }
    </section>
  )
}

export default Transaction