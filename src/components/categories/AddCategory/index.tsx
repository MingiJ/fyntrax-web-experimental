import React, { useEffect, useState } from "react";
import {
  RiAddLine,
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiCheckLine,
  RiCloseLine,
  RiGridLine,
} from "react-icons/ri";

import Info from "@components/global/Info";
import Input from "@components/global/Input";
import Loader from "@components/global/Loader";
import Dropdown from "@components/global/Dropdown";
import ButtonWithLoader from "@components/global/ButtonWithLoader";
import {
  AddCategoryProps,
  IAddCategoryState,
} from "@components/categories/AddCategory/types";

import {
  useCreateCategoryMutation,
  useListCategoriesQuery,
} from "@services/category";
import { ICategory } from "@services/category/types";

import useAccessToken from "@hooks/useAccessToken";

import validate from "@utils/validate";
import isEmpty from "@utils/isEmpty";

import CategoryValidation from "@validations/CategoryValidation";

import { useAlertContext } from "@contexts/AlertContext";
import { useSession } from "next-auth/react";
import { useListBudgetsQuery } from "@services/budget";
import { IBudget } from "@utils/interfaces";

const AddCategory = ({ closeModal, edit, id }: AddCategoryProps) => {
  const [state, setState] = useState<IAddCategoryState>({
    name: "",
    description: "",
    ancestor: {
      name: "",
      value: "",
    },
    access: {
      name: "private (only you)",
      value: "private",
    },
    subcategories: [],
  });
  const [errors, setErrors] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [subcategoryErrors, setSubcategoryErrors] = useState<any>(null);

  // Get user.
  const { data: session } = useSession();
  const user = session?.user;

  // Get access token.
  const accessToken = useAccessToken();

  // Get alert context.
  const { setAlert } = useAlertContext();

  // Get items
  const { isLoading: budgetLoading, data: budget } = useListBudgetsQuery({
    accessToken
  })

  // Get categories.
  const { isLoading: categoryLoading, data: categoryData } =
    useListCategoriesQuery({
      accessToken,
    });

  // Get create category mutation.
  const [createCategory] = useCreateCategoryMutation();

  // Handle input change.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (errors && errors[e.target.name]) {
      setErrors((prev: any) => ({
        ...prev,
        [e.target.name]: null,
      }));
    }
  };

  // Handle dropdown.
  const handleDropdown = (name: string, option: any) => {
    setState((prev) => ({
      ...prev,
      [name]: {
        ...option,
      },
    }));

    if (errors && errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: null }));
    }
  };

  // Handle subcategory entry.
  const addSubcategoryEntry = (i: number) => {
    const existingSubcats = state.subcategories;
    const subcatErrors = {};

    // Validate current entry before adding another one.
    if (i > -1) {
      const { isValid, result } = validate(
        CategoryValidation.create,
        existingSubcats[i]
      );

      if (!isValid) {
        Object.defineProperty(subcatErrors, i.toString(), { value: result });
        setSubcategoryErrors(subcatErrors);
        return;
      }
    }

    // Create entry.
    const subcat = {
      name: "",
      description: "",
    };

    existingSubcats.push(subcat);

    setState((prev) => ({
      ...prev,
      subcategories: [...existingSubcats],
    }));
  };

  // Handle delete subcategory entry.
  const removeSubcategoryEntry = (i: number) => {
    // Clear error before removing entry.
    setSubcategoryErrors((prev: any) => ({
      ...prev,
      [i.toString()]: null,
    }));

    setState((prev) => {
      let subcats = prev.subcategories.filter((_, idx) => i !== idx);
      return {
        ...prev,
        subcategories: [...subcats],
      };
    });
  };

  // Handle subcategory change.
  const handleSubcategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setState((prev) => {
      let subcats = prev.subcategories;

      subcats[i] = {
        ...subcats[i],
        [e.target.name]: e.target.value,
      };

      return {
        ...prev,
        subcategories: [...subcats],
      };
    });

    // Clear error if exists.
    setSubcategoryErrors((prev: any) => ({
      ...prev,
      [i.toString()]: null,
    }));
  };

  // Handle submit.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Create temp subcat error object. (Can't use subcat errror state because of async nature)
    const subcatErrors: { [x: string]: { name: string } } = {};

    // Prep data.
    const data = {
      ...state,
      ancestor: state.ancestor.value,
      access: state.access.value,
    };

    // Validate main category.
    const { isValid, result } = validate(CategoryValidation.create, data);

    // Validate subcategories (just in case a QA tester tries to becomes persistent).
    if (data.subcategories.length) {
      data.subcategories.forEach((subcat, idx) => {
        const { isValid: isSubcategoryValid, result: subcategoryResult } =
          validate(CategoryValidation.create, subcat);
        if (!isSubcategoryValid) {
          subcatErrors[idx.toString()] = subcategoryResult;
          setSubcategoryErrors(subcatErrors);
        }
      });
    }

    // Check for both main category and subcategory errors first.
    if (!isValid && !isEmpty(subcatErrors)) {
      setIsSubmitted(false);
      setErrors(result);
      return;
    }

    // Check independent error scenarios.
    if (!isValid) {
      setIsSubmitted(false);
      setErrors(result);
      return;
    }

    if (!isEmpty(subcatErrors)) {
      setIsSubmitted(false);
      return;
    }

    // Create or update category.
    let res: any;

    if (edit && id) {
    } else {
      res = await createCategory({ data, accessToken })
        .unwrap()
        .catch((resp) => {
          setAlert({
            msg: resp.data.message,
            type: "error",
            show: true,
          });
        });
    }

    // Handle ok response.
    if (res && res.ok) {
      closeModal();
      setAlert({
        msg: "Category added successfully.",
        type: "success",
        show: true,
      });
    }

    setIsSubmitted(false);
    return;
  };

  return (
    <div className="space-y-10">
      <div className="">
        <h2 className="title">Add category</h2>
      </div>

      <form className="space-y-10" onSubmit={handleSubmit}>
        <div className="space-y-5">
          {/* *********** NAME *********** */}
          <Input
            name="name"
            label="name *"
            type="text"
            value={state.name}
            onChange={handleChange}
            err={errors?.name}
            info="Enter category name."
            placeholder="e.g. Bills"
          />

          {/* *********** DESCRIPTION *********** */}
          <Input
            name="description"
            label="description"
            type="text"
            value={state.description}
            onChange={handleChange}
            err={errors?.description}
            info="Enter category description."
            placeholder="e.g. For all my utility bills"
          />

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="h-max flex-1 w-full">
              {budgetLoading && <Loader withContainer />}
              {!budgetLoading && budget && (
                <Dropdown
                  name="budget"
                  label="Assign to Budget"
                  active={state.budget.name || "None"}
                  options={budget.items.map((budget: IBudget) => ({
                    name: budget.name,
                    value: budget._id,
                  }))}
                  setOption={handleDropdown}
                  className="!w-full"
                />
              )}
            </div>

            {/* *********** PARENT CATEGORY *********** */}
            <div className="h-max flex-1 w-full">
              {categoryLoading && <Loader withContainer />}
              {!categoryLoading && categoryData && (
                <Dropdown
                  name="ancestor"
                  label="Choose parent category"
                  active={state.ancestor.name || "None"}
                  options={categoryData.items.map((cat: ICategory) => ({
                    name: cat.name,
                    value: cat._id,
                  }))}
                  setOption={handleDropdown}
                  className="!w-full"
                />
              )}
            </div>

            {/* *********** CATEGORY ACCESS *********** */}
            {user && user.permission === "ADMIN" && (
              <Dropdown
                name="access"
                label="Choose access"
                active={state.access.name}
                options={[
                  { name: "public (anyone)", value: "public" },
                  { name: "private (only you)", value: "private" },
                ]}
                setOption={handleDropdown}
                className="!w-full flex-1"
              />
            )}
          </div>

          {/* *********** SUBCATEGORIES TOGGLE *********** */}
          <button
            className="flex items-center gap-2 text-sky-500"
            type="button"
            onClick={() => setShowSubcategories(!showSubcategories)}
          >
            {showSubcategories ? (
              <span className="text-sm font-medium">Hide subcategories</span>
            ) : (
              <span className="text-sm font-medium">Add subcategories</span>
            )}
            {showSubcategories ? (
              <RiArrowDropUpLine />
            ) : (
              <RiArrowDropDownLine />
            )}
          </button>

          {/* *********** SUBCATEGORIES *********** */}
          {showSubcategories &&
            (state.subcategories.length ? (
              state.subcategories.map((subcat, i) => (
                <div
                  key={i}
                  className="bg-border-light p-3 rounded-xl space-y-5"
                >
                  {/* *********** SUBCATEGORY NAME *********** */}
                  <Input
                    name="name"
                    label="subcategory name *"
                    type="text"
                    value={subcat.name}
                    onChange={(e) => handleSubcategoryChange(e, i)}
                    err={
                      subcategoryErrors &&
                      subcategoryErrors[i.toString()] &&
                      subcategoryErrors[i.toString()].name
                    }
                    info="Enter subcategory name."
                    placeholder="e.g. Bills"
                  />

                  {/* *********** SUBCATEGORY DESCRIPTION *********** */}
                  <Input
                    name="description"
                    label="subcategory description"
                    type="description"
                    value={subcat.description || ""}
                    onChange={(e) => handleSubcategoryChange(e, i)}
                    err={errors?.description}
                    info="Enter subcategory description."
                    placeholder="e.g. For all my utility bills"
                  />

                  {/* *********** SUBCATEGORY CONTROLS *********** */}
                  <div className="flex items-center gap-5">
                    <button
                      type="button"
                      className="flex items-center gap-2 text-xs capitalize"
                      onClick={() => addSubcategoryEntry(i)}
                    >
                      <RiAddLine className="text-base text-primary-alt" />
                      add another
                    </button>

                    <button
                      type="button"
                      className="flex items-center gap-2 text-xs capitalize"
                      onClick={() => removeSubcategoryEntry(i)}
                    >
                      <RiCloseLine className="text-base text-red-500" />
                      remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <Info
                icon={<RiGridLine />}
                title="No subcategories added"
                description="Your subcategories will appear here."
                controls={
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => addSubcategoryEntry(-1)}
                  >
                    <RiAddLine />
                    add subcategory
                  </button>
                }
              />
            ))}
        </div>

        <div className="flex flex-col">
          <ButtonWithLoader
            type="submit"
            className="btn flex-1"
            isLoading={isSubmitted}
          >
            <i>{edit ? <RiCheckLine /> : <RiAddLine />}</i>
            {edit ? "save" : "add"} category
          </ButtonWithLoader>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
