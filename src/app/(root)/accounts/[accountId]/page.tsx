'use client'

import { useEffect, useMemo, useState } from "react"
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";
import {
  RiAddLine,
  RiArrowLeftLine,
  RiCloseCircleLine,
  RiDeleteBin6Line,
  RiEditLine,
  RiListCheck2
} from "react-icons/ri";

import Loader from "@components/global/Loader";
import TxAlt from "@components/transactions/TxAlt";
import Info from "@components/global/Info";
import ButtonWithLoader from "@components/global/ButtonWithLoader";
import Modal from "@components/global/Modal";
import ErrorMsg from "@components/global/ErrorMsg";
import AddAccount from "@components/accounts/AddAccount";
import AddTransaction from "@components/transactions/AddTransaction";

import AccountService from "@services/AccountService";

import { IAccount, ITransaction } from "@utils/interfaces";

import { useAlertContext } from "@contexts/AlertContext";

const Account = ({
  params,
  searchParams,
}: any) => {
  const [account, setAccount] = useState<IAccount | null>(null)
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [loading, setLoading] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Get push.
  const { push } = useRouter()

  // Get alert context.
  const { setAlert } = useAlertContext()

  // Get account id.
  const accountId = params.accountId

  // Get session.
  const { data: session } = useSession()
  const accessToken = session?.user.accessToken as string

  // Create tx account.
  const txAccount = useMemo(() => {
    if (account) {
      return {
        name: account.name,
        id: account._id
      }
    }
  }, [account])

  // Handle delete.
  const handleDelete = async (id: string, closeModal: Function) => {
    setIsSubmitted(true)

    const res = await AccountService.remove({
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
    push('/accounts')
  }

  useEffect(() => {
    async function getAccount() {
      setLoading(true)

      const res = await AccountService.fetch({
        id: accountId,
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
    
      setAccount(res.account)
      setTransactions(res.transactions)
      setLoading(false)
    }

    if (accessToken) {
      getAccount()
    }
  }, [accessToken, accountId, setAlert])


  return (
    <>
      {loading ? <Loader withContainer /> :
        <div className="space-y-8">
          {/* *********** LINK TO OVERVIEW *********** */}
          <div className="">
            <Link href='/accounts' className="flex items-center gap-2 text-primary-alt text-sm">
              <RiArrowLeftLine />
              Overview
            </Link>
          </div>

          {/* *********** META *********** */}
          <div className="flex flex-col gap-8 text-center xs:text-left xs:flex-row xs:justify-between items-center">
            <div className="space-y-2">
              <h2 className="text-xl lg:text-2xl font-bold">{account?.name}</h2>
              {account?.number && <p className="text-primary-alt">{account?.number}</p>}
            </div>

            <div className="xs:text-end space-y-1">
              <div className="text-3xl font-bold">
                <span className="text-primary dark:text-white">
                  {account?.balance.toLocaleString()}
                </span>
                {/* <span className="text-neutral-400 dark:text-neutral-500">.{(decimal && decimal.length === 1 && `${decimal}0`) || '00'}</span> */}
              </div>

              <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase">{account?.currency}</p>
            </div>
          </div>

          {/* *********** CONTROLS *********** */}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">

            {/* *********** ADD TRANSACTION *********** */}
            <div className="dropdown">
              <button className="btn-outline">
                <i><RiAddLine /></i>
                add transaction
              </button>

              <div className="dropdown-content pt-2 min-w-max w-full">
                <div className="bg-border p-1 w-full rounded-lg">
                  <Modal
                    renderOpener={(openModal: any) => (
                      <button
                        className="text-xs flex items-center gap-1 capitalize p-2 hover:bg-neutral-200
                        dark:hover:bg-neutral-800 rounded-md w-full"
                        onClick={openModal}
                      >
                        income
                      </button>
                    )}
                    renderChildren={(closeModal: any) => (
                      <AddTransaction
                        closeModal={closeModal}
                        type="income"
                        account={txAccount}
                      />
                    )}
                  />

                  <Modal
                    renderOpener={(openModal: any) => (
                      <button
                        className="text-xs flex items-center gap-1 capitalize p-2 hover:bg-neutral-200
                        dark:hover:bg-neutral-800 rounded-md w-full"
                        onClick={openModal}
                      >
                        expense
                      </button>
                    )}
                    renderChildren={(closeModal: any) => (
                      <AddTransaction
                        closeModal={closeModal}
                        type="expense"
                        account={txAccount}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 sm:flex-row">
              {/* *********** EDIT ACCOUNT *********** */}
              <Modal
                renderOpener={(openModal: any) => 
                  <button className="btn-outline" onClick={openModal}>
                    <i><RiEditLine /></i>
                    edit
                  </button>
                }

                renderChildren={(closeModal: any) => (
                  <AddAccount closeModal={closeModal} edit account={account} />
                )}
              />
              
              {/* *********** DELETE ACCOUNT *********** */}
              <Modal
                renderOpener={(openModal: any) => 
                  <button className="btn-outline" onClick={openModal}>
                    <i><RiDeleteBin6Line className="text-red-500" /></i>
                    delete
                  </button>
                }
                renderChildren={(closeModal: any) => (
                  <div className="space-y-5">
                    <h2 className="title">Delete account?</h2>

                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      This account and all its transactions will be permanently deleted and will not be recoverable. Continue?
                    </p>

                    {deleteError && <ErrorMsg msg={deleteError} />}

                    <div className="flex items-center gap-2">
                      <ButtonWithLoader
                        type="button"
                        className="btn btn-danger"
                        isLoading={isSubmitted}
                        onClick={() => handleDelete(accountId, closeModal)}
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
          </div>

          {/* *********** TXS *********** */}
          {!loading && !transactions.length &&
            <Info
              icon={<RiListCheck2 />}
              title='No transactions yet'
              description="You don't have any transaction yet. When you create one, it will appear here."
            />
          }

          {transactions.length > 0 && 
            <div className="space-y-5">
              {transactions.map(tx => (
                <TxAlt
                  key={tx._id}
                  id={tx._id}
                  title={tx.title}
                  amount={tx.amount}
                  currency={tx.currency}
                  type={tx.type}
                  category={tx.category}
                  date={tx.date}
                />
              ))}
            </div>
          }
        </div>
      }
    </>
  );
}

export default Account