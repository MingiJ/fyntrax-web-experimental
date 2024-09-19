"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  RiAddLine,
  RiArrowDropDownLine,
  RiFileList3Line,
  RiInformationLine,
} from "react-icons/ri";
import { IoMdSpeedometer } from "react-icons/io";

import BarGraph from "@components/global/BarGraph";
import Tx from "@components/transactions/Tx";
import Loader from "@components/global/Loader";
import Info from "@components/global/Info";
import StatsOverview from "@components/global/StatsOverview";
import Modal from "@components/global/Modal";
import AddTransaction from "@components/transactions/AddTransaction";

import UserService from "@services/UserService";

import { useAlertContext } from "@contexts/AlertContext";
import { useNetworkStatus } from "@contexts/NetworkStatusContext";

import { ITransaction } from "@utils/interfaces";

import useAccessToken from "@hooks/useAccessToken";
import useOnboardingStatus from "@hooks/useOnboardingStatus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MultipleContainers } from "@components/dnd/MultipleContainers";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  // Get session.
  const { data: session } = useSession();

  const accessToken = useAccessToken();

  const { setAlert } = useAlertContext();
  const { isOnboarded } = useOnboardingStatus();
  const { isOnline } = useNetworkStatus();

  useEffect(() => {
    (async () => {
      if (accessToken && isOnline) {
        setLoading(true);
        const res = await UserService.getSummary({ accessToken });

        if (!res.ok) {
          setLoading(false);
          setAlert({
            msg: res.message,
            type: "error",
            show: true,
          });
          return;
        }

        setSummary(res.summary);
        setLoading(false);
      }
    })();
  }, [accessToken, setAlert, isOnline]);

  if (!loading && isOnline && !isOnboarded) {
    window.location.href = "/onboarding";
    return;
  }

  return (
    <section className="space-y-8">
      {/* *********** HEADER *********** */}
      {session && (
        <div className="flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
          <div className="">
            <h1 className="text-xl md:text-2xl mb-1">
              Welcome{" "}
              <span className="font-bold">{session?.user.firstname},</span>
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Here&apos;s a quick look at your finances.
            </p>
          </div>

          <div className="btn">
            <DropdownMenu>
              <DropdownMenuTrigger>+ Add new</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Add New</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <button onClick={() => setShowModal(true)}>
                  <DropdownMenuItem>
                    <div className="bg-border p-1 w-full rounded-lg ">
                      <Modal
                        showModal={showModal}
                        closeModal={closeModal}
                        renderChildren={(closeModal: any) => (
                          <AddTransaction
                            closeModal={closeModal}
                            type="income"
                          />
                        )}
                      />
                    </div>
                  </DropdownMenuItem>
                </button>
                <DropdownMenuItem>
                  <div className="bg-border p-1 w-full rounded-lg">
                    <Modal
                      renderChildren={(closeModal: any) => (
                        <AddTransaction
                          closeModal={closeModal}
                          type="expense"
                        />
                      )}
                    />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      {loading ? (
        <Loader withContainer />
      ) : (
        <>
          {/* *********** CONTENT *********** */}
          <div className="w-full space-y-10">
            {/* *********** KPIs *********** */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <StatsOverview />

              {/* *********** CHART *********** */}
              <div className="h-max space-y-8">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold capitalize">your spending</h5>

                  {/* *********** DROPDOWN *********** */}
                  <div className="dropdown">
                    <div
                      className="px-3 py-2 border border-neutral-300 dark:border-neutral-800 flex items-center justify-between
                      gap-10 rounded-lg mb-2 cursor-pointer"
                      tabIndex={0}
                    >
                      <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                        Month
                      </span>
                      <span className="text-primary-alt">
                        <RiArrowDropDownLine />
                      </span>
                    </div>

                    <div
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-white/90 dark:bg-neutral-900 w-full
                    backdrop-blur rounded-xl text-xs font-medium border border-neutral-300 dark:border-neutral-800"
                    >
                      <div
                        className="p-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg text-neutral-500
                      hover:text-black dark:hover:text-white"
                      >
                        Month
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[300px]">
                  {summary && <BarGraph data={summary.spendingData} />}
                </div>
              </div>
            </div>

            {/* *********** LIMIT & TXS *********** */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* *********** SPENDING LIMIT *********** */}
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold">Spending Limit</h5>
                  <button className="flex items-center gap-2 text-sm text-primary-alt">
                    <RiInformationLine />
                    Learn more
                  </button>
                </div>

                <Info
                  icon={<IoMdSpeedometer />}
                  title="Coming soon."
                  description="Set a daily, monthly or yearly spending limit."
                />
              </div>

              {/* *********** TXS *********** */}
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold">Recent Transactions</h5>
                  <Link
                    href="/transactions"
                    className="text-primary-alt alt text-sm"
                  >
                    View All
                  </Link>
                </div>

                {summary && summary.recentTransactions.length > 0 ? (
                  <div className="space-y-5">
                    {summary.recentTransactions.map((tx: ITransaction) => (
                      <Tx
                        key={tx._id}
                        id={tx._id}
                        title={tx.title}
                        category={tx.category}
                        type={tx.type}
                        amount={tx.amount}
                        currency={tx.currency}
                        grandTotal={tx.grandTotal}
                      />
                    ))}
                  </div>
                ) : (
                  <Info
                    icon={<RiFileList3Line />}
                    title="No transactions yet."
                    description="You haven't added any transaction yet."
                  />
                )}
              </div>
            </div>
              <div>
                <MultipleContainers/>
              </div>
          </div>
        </>
      )}
    </section>
  );
}
