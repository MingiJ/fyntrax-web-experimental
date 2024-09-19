"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { DayPicker, ClassNames } from "react-day-picker";
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

import { useAlertContext } from "@contexts/AlertContext";
import BudgetValidation from "@validations/BudgetValidation";
import BudgetService from "@services/BudgetService";
import { AddBudgetProps } from "./types";

const AddTransaction = ({ edit, id, closeModal }: AddBudgetProps) => {
  const [state, setState] = useState({
    title: "",
    totalAmount: 0,
  });
  const [errors, setErrors] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get session.
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken as string;

  // Get alert context.
  const { setAlert } = useAlertContext();

  // Get push.
  const { push } = useRouter();

  // Handle input change.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (errors && errors[e.target.name]) {
      setErrors((prev: any) => ({ ...prev, [e.target.name]: null }));
    }
  };

  // Handle form submission.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Prep data.
    const data = {
      ...state,
      totalAmount: Math.abs(state.totalAmount),
    };

    // Validate budget data.
    const { isValid, result } = validate(BudgetValidation.create, data);

    if (!isValid) {
      setIsSubmitted(false);
      setErrors(result);
      return;
    }

    // Update or create budget.
    let res: any;

    if (edit && id) {
      res = await BudgetService.update(id, data, accessToken);
    } else {
      res = await BudgetService.create(
        {
          name: data.title,
          totalAmount: data.totalAmount,
        },
        session?.user.accessToken as string
      );
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
      msg: `Budget ${edit ? "updated" : "added"} successfully.`,
      type: "success",
      show: true,
    });
    push(`/budgets/${res.budgetId}`);
  };

  // Get budget if edit.
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
          title: data.budget.title,
          totalAmount: data.budget.totalAmount,
        }));
        setLoading(false);
      })();
    }
  }, [id, accessToken, edit, setAlert]);

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <h2 className="title">{edit ? "Edit " : "Add "} Budget</h2>
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
                name="totalAmount"
                value={state.totalAmount || ""}
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
                placeholder={`Add Title * (.e.g. Monthly Budget)`}
                className="text-xl xs:text-2xl w-full outline-none pb-7 border-b border-neutral-200
                bg-transparent dark:border-neutral-800 focus:border-black dark:focus:border-white transition"
              />
              {errors?.title && <ErrorMsg msg={errors.title} />}
            </div>

            {/* *********** CONTROLS *********** */}
            <div className="grid grid-cols-1 w-full sticky top-full">
              <ButtonWithLoader
                type="submit"
                className="btn flex-1"
                isLoading={isSubmitted}
              >
                <i>{edit ? <RiCheckLine /> : <RiAddLine />}</i>
                {edit ? "save " : "add "} Budget
              </ButtonWithLoader>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTransaction;
