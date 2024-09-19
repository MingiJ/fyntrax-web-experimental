import Link from "next/link"
import {
  RiAddLine,
  RiBankCardLine,
  RiDashboard2Line,
  RiListCheck2,
  RiStackLine
} from "react-icons/ri"

import Modal from "@components/global/Modal"
import AddTransaction from "@components/transactions/AddTransaction"

const FloatingNav = () => {
  return (
    <div className="flex sm:hidden fixed z-40 bottom-4 left-1/2 -translate-x-1/2 w-max
    items-center gap-2 p-2 border border-neutral-200 dark:border-neutral-800 bg-white/90
    dark:bg-neutral-900/80 backdrop-blur rounded-2xl shadow-md">
      <Link href='/' className="icon-btn text-primary-alt">
        <RiDashboard2Line />
      </Link>

      <Link href='/transactions' className="icon-btn text-primary-alt">
        <RiListCheck2 />
      </Link>

      <Link href='/accounts' className="icon-btn text-primary-alt">
        <RiBankCardLine />
      </Link>

      <Link href='/portfolio' className="icon-btn text-primary-alt">
        <RiStackLine />
      </Link>

      <div className="pl-2 border-l border-primary-alt/20">
        <div className="dropdown dropdown-top">
          <button className="btn">
            <RiAddLine />
            add
          </button>
          
          <div className="dropdown-content pb-2 min-w-max w-full">
            <div className="bg-border p-1 w-full rounded-lg">
              <Modal
                renderOpener={(openModal: any) => (
                  <button
                    className="text-xs flex items-center gap-1 capitalize p-2 hover:bg-neutral-200
                    dark:hover:bg-neutral-800 rounded-md w-full"
                    onClick={openModal}
                  >
                    <RiAddLine />
                    add income
                  </button>
                )}
                renderChildren={(closeModal: any) => (
                  <AddTransaction closeModal={closeModal} type="income" />
                )}
              />

              <Modal
                renderOpener={(openModal: any) => (
                  <button
                    className="text-xs flex items-center gap-1 capitalize p-2 hover:bg-neutral-200
                    dark:hover:bg-neutral-800 rounded-md w-full"
                    onClick={openModal}
                  >
                    <RiAddLine />
                    add expense
                  </button>
                )}
                renderChildren={(closeModal: any) => (
                  <AddTransaction closeModal={closeModal} type="expense" />
                )}
              />
            </div>
          </div>
          
        </div>
      </div>

    </div>
  )
}

export default FloatingNav