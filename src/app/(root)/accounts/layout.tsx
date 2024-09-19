'use client'

import { usePathname } from "next/navigation"
import { RiAddLine, RiBankCardLine } from "react-icons/ri"

import AccountTab from "@components/accounts/AccountTab"
import AddAccount from "@components/accounts/AddAccount"
import Loader from "@components/global/Loader"
import Modal from "@components/global/Modal"

import { IAccount } from "@utils/interfaces"

import useAccounts from "@hooks/useAccounts"

const AccountsLayout = ({ children }: { children: React.ReactNode }) => {
  const { accounts, loading } = useAccounts()

  return (
    <section className="space-y-8">
      {/* *********** HEADER *********** */}
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4">
        <h1 className="title">Your Accounts</h1>
        
        <Modal
          renderOpener={(openModal: any) => (
            <button className='btn !hidden xs:!flex' onClick={openModal}>
              <i><RiAddLine /></i>
              add account
            </button>
          )}
          renderChildren={(closeModal: any) => (
            <AddAccount closeModal={closeModal} />
          )}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* *********** ACCOUNT TABS *********** */}
        <div className="hidden md:block w-full h-max md:w-72 sticky top-20">
          <div className="bg-border rounded-2xl space-y-5 col-span-1 p-2">
            <div className="space-y-1">
              {loading && <Loader withContainer/>}

              {!loading && !accounts?.length && 
                <div className="flex flex-col items-center text-center gap-2 p-2">
                  <div className="text-3xl flex items-center justify-center text-primary-alt">
                    <RiBankCardLine />
                  </div>

                  <div className="">
                    <h3 className="font-semibold">No accounts yet</h3>

                    <div className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      Your accounts will appear here.
                    </div>
                  </div>
                </div>
              }

              {accounts?.length > 0 && accounts?.map((account: IAccount) => (
                <AccountTab
                  key={account._id}
                  id={account._id}
                  name={account.name}
                  number={account.number}
                  provider={account.provider}
                />
              ))}
            </div>

            <hr className="border-neutral-200 dark:border-neutral-800" />
            
            <Modal
              renderOpener={(openModal: any) => (
                <button className='btn w-full' onClick={openModal}>
                  <i><RiAddLine /></i>
                  add account
                </button>
              )}
              renderChildren={(closeModal: any) => (
                <AddAccount closeModal={closeModal} />
              )}
            />
          </div>
        </div>

        {/* *********** ACCOUNT CONTENT *********** */}
        <div className="md:flex-1">
          {children}    
        </div>
      </div>
    </section>
  )
}

export default AccountsLayout