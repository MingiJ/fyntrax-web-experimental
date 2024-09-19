"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { DayPicker, ClassNames } from "react-day-picker";
// import TimePicker from "react-time-picker"
import {
  RiAddLine,
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiCalendarEventLine,
  RiCheckLine,
  RiInformationLine,
  RiTimeLine,
} from "react-icons/ri";
import styles from "react-day-picker/dist/style.css";

import Dropdown from "@components/global/Dropdown";
import ButtonWithLoader from "@components/global/ButtonWithLoader";
import ErrorMsg from "@components/global/ErrorMsg";
import Loader from "@components/global/Loader";
import { AddTransactionProps } from "@components/transactions/AddTransaction/types";

import TxService from "@services/TxService";
import { useListCategoriesQuery } from "@services/category";
import { ICategory } from "@services/category/types";

import TxValidation from "@validations/TxValidation";

import validate from "@utils/validate";

import useAccounts from "@hooks/useAccounts";
import useCurrencies from "@hooks/useCurrencies";

import { useAlertContext } from "@contexts/AlertContext";

const AddTransaction = ({
  edit,
  id,
  closeModal,
  type,
  account,
}: AddTransactionProps) => {
  const [state, setState] = useState({
    title: "",
    description: "",
    amount: 0,
    cost: 0,
    type: {
      name: type,
      value: type,
    },
    currency: {
      name: "",
      value: "",
    },
    category: {
      name: "",
      value: "",
    },
    costs: [],
    img: "",
    account: {
      name: "",
      value: "",
    },
    date: new Date(),
    initialAmount: 0,
    initialAccount: "",
    iniitialType: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState("10:00");
  const [errors, setErrors] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);

  // Get session.
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  // Get accounts.
  const { accounts, loading: accountLoading } = useAccounts();

  // Get currencies.
  const { defaultCurrency, currencies } = useCurrencies();

  // Get categories.
  const { isLoading: categoryLoading, data: categoryData } =
    useListCategoriesQuery({
      accessToken,
    });

  // Get alert context.
  const { setAlert } = useAlertContext();

  // Get push.
  const { push } = useRouter();

  // Date picker classnames.
  const dateClassnames: ClassNames = {
    ...styles,
    cell: "p-1",
    day: "!text-sm !p-1 hover:!bg-neutral-300 dark:hover:!bg-neutral-700 !rounded-lg",
    day_selected:
      "!bg-primary hover:!bg-primary dark:hover:!bg-primary !text-white",
  };

  // Handle input change.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (errors && errors[e.target.name]) {
      setErrors((prev: any) => ({ ...prev, [e.target.name]: null }));
    }
  };

  // Handle dropdown.
  const handleDropdown = (name: string, option: any) => {
    setState((prev) => ({
      ...prev,
      [name]: option,
    }));

    if (errors && errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: null }));
    }
  };

  // Handle form submission.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Prep data.
    const data = {
      ...state,
      account: state.account.value,
      type,
      currency: state.currency.value,
      category: state.category.value,
      amount: Math.abs(state.amount),
    };

    // Validate transaction data.
    const { isValid, result } = validate(TxValidation.create, data);

    if (!isValid) {
      setIsSubmitted(false);
      setErrors(result);
      return;
    }

    // Update or create transaction.
    let res: any;

    if (edit && id) {
      res = await TxService.update(id, data, accessToken);
    } else {
      res = await TxService.create(data, session?.user.accessToken as string);
    }

    // Handle error if any.
    if (!res.ok) {
      setIsSubmitted(false);
      setAlert({
        msg: res.message,
        type: "error",
        show: true,
      });
      return;
    }

    closeModal();
    setAlert({
      msg: `Transaction ${edit ? "updated" : "added"} successfully.`,
      type: "success",
      show: true,
    });
    push(`/transactions/${res.transactionId}`);
  };

  // Set account if exists.
  useEffect(() => {
    if (account) {
      setState((prev) => ({
        ...prev,
        account: {
          name: account.name,
          value: account.id,
        },
      }));
    }
  }, [account]);

  // Set default currency values.
  useEffect(() => {
    if (currencies) {
      setAvailableCurrencies(currencies);
    }

    if (!edit && defaultCurrency) {
      setState((prev) => ({
        ...prev,
        currency: {
          name: defaultCurrency.toUpperCase(),
          value: defaultCurrency,
        },
      }));
    }
  }, [defaultCurrency, currencies, edit, categoryData]);

  // Get transaction if edit.
  useEffect(() => {
    if (edit && accessToken && id) {
      (async () => {
        setLoading(true);

        const data = await TxService.fetch({
          id,
          accessToken,
        });

        if (!data.ok) {
          setLoading(false);
          setAlert({
            msg: data.message,
            type: "error",
            show: true,
          });
          return;
        }

        setState((prev) => ({
          ...prev,
          ...data.transaction,
          date: new Date(data.transaction.date),
          type: {
            name: data.transaction.type,
            value: data.transaction.type,
          },
          currency: {
            name: data.transaction.currency,
            value: data.transaction.currency,
          },
          account: {
            name: data.transaction.account?.name || "",
            value: data.transaction.account?._id || "",
          },
          iniitialType: data.transaction.type,
          initialAccount: data.transaction.account || "",
          initialAmount: data.transaction.amount,
          amount: data.transaction.amount,
        }));
        setLoading(false);
      })();
    }
  }, [id, accessToken, edit, setAlert]);

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <h2 className="title">
          {edit ? "Edit" : "Add"} {type}
        </h2>
      </div>

      {loading ? (
        <Loader withContainer className="!h-[300px]" />
      ) : (
        <form className="space-y-10" onSubmit={handleSubmit}>
          {/* *********** INPUTS *********** */}
          <div className="space-y-8 pr-5 scrollbar">
            {/* *********** AMOUNT *********** */}
            <div className="space-y-3">
              <input
                name="amount"
                value={state.amount || ""}
                onChange={handleChange}
                type="number"
                placeholder="0.00 *"
                step={0.01}
                className="text-4xl xs:text-5xl font-semibold w-full outline-none pb-7 border-b border-neutral-200
                bg-transparent dark:border-neutral-800 focus:border-black dark:focus:border-white transition"
              />
              {errors?.amount && <ErrorMsg msg={errors.amount} />}
            </div>

            {/* *********** TITLE *********** */}
            <div className="space-y-3">
              <input
                name="title"
                value={state.title}
                onChange={handleChange}
                type="text"
                placeholder={`Add Title * (.e.g. ${type === "expense" ? "Macbook Pro" : "Salary"})`}
                className="text-xl xs:text-2xl w-full outline-none pb-7 border-b border-neutral-200
                bg-transparent dark:border-neutral-800 focus:border-black dark:focus:border-white transition"
              />
              {errors?.title && <ErrorMsg msg={errors.title} />}
            </div>

            {/* *********** CATEGORY & ACCOUNT *********** */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {/* *********** CATEGORY *********** */}
              <div className="h-max">
                {categoryLoading && <Loader withContainer />}
                {!categoryLoading && categoryData && (
                  <Dropdown
                    name="category"
                    label="category"
                    active={state.category.name || "category"}
                    options={categoryData.items.map((cat: ICategory) => ({
                      name: cat.name,
                      value: cat._id,
                    }))}
                    setOption={handleDropdown}
                    className="!w-full"
                  />
                )}
              </div>

              {/* *********** ACCOUNT *********** */}
              <div className="h-max">
                {accountLoading && <Loader withContainer />}
                {!accountLoading && accounts && (
                  <Dropdown
                    name="account"
                    active={state.account.name}
                    options={accounts.map((acc) => ({
                      name: `${acc.name} (${acc.currency.toUpperCase()})`,
                      value: acc._id,
                    }))}
                    label="account"
                    setOption={handleDropdown}
                    className="!w-full"
                    defaultDisplay="Choose account..."
                  />
                )}
              </div>

              {/* *********** CURRENCY *********** */}
              <div className="space-y-3 h-max">
                <Dropdown
                  name="currency"
                  active={state.currency.name}
                  options={availableCurrencies.map((curr: string) => ({
                    name: curr.toUpperCase(),
                    value: curr,
                  }))}
                  label="currency"
                  setOption={handleDropdown}
                  className="!w-full"
                />
                {errors?.currency && <ErrorMsg msg={errors.currency} />}
              </div>
            </div>

            {/* *********** MORE DETAILS TOGGLE *********** */}
            <button
              className="flex items-center gap-2 text-sky-500"
              type="button"
              onClick={() => setShowMoreDetails(!showMoreDetails)}
            >
              {showMoreDetails ? (
                <span className="text-sm font-medium">Hide more details</span>
              ) : (
                <span className="text-sm font-medium">Add more details</span>
              )}
              {showMoreDetails ? (
                <RiArrowDropUpLine />
              ) : (
                <RiArrowDropDownLine />
              )}
            </button>

            {/* *********** MORE DETAILS *********** */}
            {showMoreDetails && (
              <div className="space-y-8">
                {/* *********** DATE & TIME *********** */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* *********** DATE *********** */}
                  <div className="relative dropdown w-full">
                    <button
                      type="button"
                      className="px-4 py-2.5 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between
                      gap-2.5 rounded-lg cursor-pointer bg-neutral-50 dark:bg-neutral-900 w-full"
                      onClick={() => setShowDatePicker(true)}
                      tabIndex={0}
                    >
                      <div className="text-xs font-medium capitalize text-neutral-500 dark:text-neutral-400">
                        {format(state.date, "MMM d, yyy")}
                      </div>

                      <span className="text-primary-alt">
                        <RiCalendarEventLine />
                      </span>
                    </button>

                    {showDatePicker && (
                      <div
                        tabIndex={0}
                        className="dropdown-content absolute bottom-full mb-4 left-0 xs:left-auto xs:right-0"
                      >
                        <DayPicker
                          className="bg-border backdrop-blur p-4 !m-0 !mt-2 rounded-2xl"
                          mode="single"
                          selected={state.date}
                          onSelect={(v) =>
                            setState((prev) => {
                              if (v) {
                                return { ...prev, date: v as Date };
                              } else return prev;
                            })
                          }
                          classNames={dateClassnames}
                        />
                      </div>
                    )}
                  </div>

                  {/* *********** TIME *********** */}
                  <div className="relative">
                    <button
                      className="px-4 py-2.5 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between
                      gap-2.5 rounded-lg cursor-pointer bg-neutral-50 dark:bg-neutral-900 w-full"
                      onClick={() =>
                        setShowTimePicker((prev: boolean) => !prev)
                      }
                      type="button"
                    >
                      <span className="text-xs font-medium capitalize text-neutral-500 dark:text-neutral-400">
                        {format(new Date(), "h.mm a")}
                      </span>

                      <span className="text-primary-alt">
                        <RiTimeLine />
                      </span>
                    </button>

                    {/* {showTimePicker && <div className="absolute bg-border w-full p-3 rounded-xl mt-2">         
                      <TimePicker
                        onChange={setTime}
                        value={time}
                        clockClassName='text-white'
                        clockIcon={null}
                      />
                    </div>} */}
                  </div>
                </div>

                {/* *********** DESCRIPTION *********** */}
                <textarea
                  name="description"
                  value={state.description}
                  onChange={handleChange}
                  placeholder={`Add Description (.e.g. ${type === "expense" ? "Bought a new Macbook Pro" : "This month's salary"})`}
                  className="text-sm xs:text-base w-full outline-none pb-7 border-b border-neutral-200
                  bg-transparent dark:border-neutral-800 focus:border-black dark:focus:border-white transition"
                ></textarea>

                {/* *********** COST *********** */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">Cost</h3>

                    <div className="flex items-center gap-1.5 text-primary-alt">
                      <RiInformationLine />
                      <span className="text-sm">Learn more</span>
                    </div>
                  </div>

                  <input
                    className="input"
                    name="cost"
                    placeholder="0.00"
                    value={state.cost}
                    type="number"
                    onChange={handleChange}
                    min={0}
                  />
                </div>
              </div>
            )}
          </div>

          {/* *********** CONTROLS *********** */}
          <div className="grid grid-cols-1 w-full sticky top-full">
            <ButtonWithLoader
              type="submit"
              className="btn flex-1"
              isLoading={isSubmitted}
            >
              <i>{edit ? <RiCheckLine /> : <RiAddLine />}</i>
              {edit ? "save" : "add"} {type}
            </ButtonWithLoader>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTransaction;
