"use client";
import { useContext, useState, useCallback, useEffect } from "react";
import { RiAddLine, RiListCheck2, RiWifiOffLine } from "react-icons/ri";

import Dropdown from "@components/global/Dropdown";
import Search from "@components/global/Search";
import TxAlt from "@components/transactions/TxAlt";
import Info from "@components/global/Info";
import Modal from "@components/global/Modal";
import AddTransaction from "@components/transactions/AddTransaction";
import InfiniteScrollLoader from "@components/global/InfiniteScrollLoader";

import TxService from "@services/TxService";

import { AlertContext } from "@contexts/AlertContext";
import { useNetworkStatus } from "@contexts/NetworkStatusContext";

import useAccessToken from "@hooks/useAccessToken";
import useInfiniteScroll from "@hooks/useInfiniteScroll";

const Transactions = () => {
  const [filter, setFilter] = useState({
    sortBy: {
      name: "",
      value: "",
    },
    period: {
      name: "",
      value: "",
    },
    groupBy: {
      name: "",
      value: "",
    },
    q: "",
  });

  // Get alert context.
  const { setAlert } = useContext(AlertContext);

  const { isOnline } = useNetworkStatus();

  // Get token.
  const accessToken = useAccessToken();

  // Create get service.
  const getTransactions = useCallback(
    async (page: number) => {
      return await TxService.list({
        query: { page },
        accessToken,
      });
    },
    [accessToken]
  );

  // Get infinite scroll.
  const { isLastPage, isLoading, items, targetRefCallback } =
    useInfiniteScroll(getTransactions);

  // Handle dropdown.
  const handleDropdown = (name: string, value: any) => {
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle query.
  const setQuery = (value: string) => {
    setFilter((prev) => ({
      ...prev,
      q: value,
    }));
  };

  // Handle search.
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="space-y-6">
        <h1 className="title">Your Transactions</h1>

        {/* *********** STATS *********** */}

        {/* *********** CONTROLS *********** */}
        <div
          className="flex flex-col lg:flex-row lg:justify-between lg:items-center
        gap-2 lg:gap-5 h-max sticky top-16 z-10"
        >
          <Search
            query={filter.q}
            setQuery={setQuery}
            handleSearch={handleSearch}
            placeholder="Search transactions"
          />

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="flex flex-col xs:flex-row gap-2">
              <Dropdown
                name="sortBy"
                active={filter.sortBy.name}
                options={[
                  { name: "category", value: "category" },
                  { name: "date", value: "date" },
                ]}
                label="sort"
                setOption={handleDropdown}
              />

              <Dropdown
                name="period"
                active={filter.period.name}
                options={[
                  { name: "1w", value: "1w" },
                  { name: "1m", value: "1m" },
                  { name: "1y", value: "1y" },
                ]}
                label="period"
                setOption={handleDropdown}
              />
            </div>

            <div className="lg:pl-4 lg:ml-2 lg:border-l border-neutral-200 dark:border-neutral-800 hidden sm:block">
              <div className="dropdown">
                <button className="btn w-max">
                  <RiAddLine />
                  add new
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
                        <AddTransaction
                          closeModal={closeModal}
                          type="expense"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* *********** TRANSACTIONS *********** */}
        {items.length > 0 && (
          <div className="space-y-5">
            {items.map((tx) => (
              <TxAlt
                key={tx._id}
                id={tx._id}
                title={tx.title}
                category={tx.category}
                amount={tx.amount}
                type={tx.type}
                date={tx.date}
                currency={tx.currency}
                cost={tx.cost}
                grandTotal={tx.grandTotal}
              />
            ))}
          </div>
        )}

        {!items.length && !isLoading && isOnline && (
          <Info
            icon={<RiListCheck2 />}
            title="No transactions yet"
            description="You don't have any transaction yet. When you create one, it will appear here."
          />
        )}

        {!items.length && !isLoading && !isOnline && (
          <Info
            icon={<RiWifiOffLine className="text-red-500" />}
            title="No network connection"
            description="Please check your internet connection."
          />
        )}

        <InfiniteScrollLoader
          isLastPage={isLastPage}
          isLoading={isLoading}
          targetRefCallback={targetRefCallback}
        />
      </section>
    </>
  );
};

export default Transactions;
