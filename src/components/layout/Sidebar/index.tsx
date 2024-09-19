import { useContext } from "react";
import {
  RiDashboard2Line,
  RiListCheck2,
  RiBankCardLine,
  RiStackLine,
  RiBarChart2Line,
  RiCopyrightLine,
  RiFlagLine,
  RiCalendarCheckLine,
  RiSettingsLine,
  RiCloseLine,
  RiMoonLine,
  RiSunLine,
  RiAddLine,
  RiCalculatorLine,
} from "react-icons/ri";

import Brand from "@components/global/Brand";
import Navlink from "@components/layout/Navlink";
import { SidebarProps } from "@components/layout/Sidebar/types";
import Modal from "@components/global/Modal";
import AddTransaction from "@components/transactions/AddTransaction";
import AddAccount from "@components/accounts/AddAccount";
import AddCategory from "@components/categories/AddCategory";

import { useThemeContext } from "@contexts/ThemeContext";

const Sidebar = ({ open, close }: SidebarProps) => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <nav
      className={`fixed top-0 left-0 h-screen w-52 z-50 border-r border-neutral-200 dark:border-neutral-800
    py-8 bg-white/90 dark:bg-dark backdrop-blur flex flex-col justify-between ${
      open ? "translate-x-0" : "-translate-x-full"
    }
    lg:!translate-x-0 transition`}
    >
      <button
        className="icon-btn absolute top-4 right-4 flex lg:hidden"
        onClick={close}
      >
        <RiCloseLine />
      </button>

      <div className="space-y-8">
        {/* ********** BRAND ********** */}
        <div className="px-6">
          <Brand />
        </div>

          <hr className="mx-6 my-2 dark:border-neutral-800" />

        {/* ********** LINKS ********** */}
        <div className="flex flex-col gap-4">
          <Navlink name="overview" path="/" icon={<RiDashboard2Line />} />
          <Navlink name="budgets" path="/budgets" icon={<RiCalculatorLine />} />

          <Navlink
            name="transactions"
            path="/transactions"
            icon={<RiListCheck2 />}
          />

          <Navlink name="accounts" path="/accounts" icon={<RiBankCardLine />} />

          <Navlink name="portfolio" path="/portfolio" icon={<RiStackLine />} />

          <Navlink
            name="analytics"
            path="/analytics"
            icon={<RiBarChart2Line />}
          />

          {/* ********** SEP ********** */}
          <hr className="mx-6 my-2 dark:border-neutral-800" />

          <Navlink name="goals" path="/goals" icon={<RiFlagLine />} />

          <Navlink name="plans" path="/plans" icon={<RiCalendarCheckLine />} />

          <Navlink name="settings" path="/settings" icon={<RiSettingsLine />} />

          {/* ********** SEP ********** */}
          <hr className="mx-6 my-2 dark:border-neutral-800" />

          <div className="px-4 space-y-3">
            <h4 className="text-xs font-medium text-neutral-500 px-2">
              Shortcuts
            </h4>

            <div className="">
              <Modal
                renderOpener={(openModal: any) => (
                  <button
                    className="flex items-center w-full gap-2 text-xs p-2 rounded-md hover:bg-neutral-100
                      dark:hover:bg-neutral-800 text-neutral-600 hover:text-black dark:hover:text-white
                      dark:text-neutral-400 transition"
                    onClick={openModal}
                  >
                    <RiAddLine className="text-primary-alt text-base" />
                    <span className="font-medium">Add income</span>
                  </button>
                )}
                renderChildren={(closeModal: any) => (
                  <AddTransaction closeModal={closeModal} type="income" />
                )}
              />

              <Modal
                renderOpener={(openModal: any) => (
                  <button
                    className="flex items-center w-full gap-2 text-xs p-2 rounded-md hover:bg-neutral-100
                      dark:hover:bg-neutral-800 text-neutral-600 hover:text-black dark:hover:text-white
                      dark:text-neutral-400 transition"
                    onClick={openModal}
                  >
                    <RiAddLine className="text-primary-alt text-base" />
                    <span className="font-medium">Add expense</span>
                  </button>
                )}
                renderChildren={(closeModal: any) => (
                  <AddTransaction closeModal={closeModal} type="expense" />
                )}
              />

              <Modal
                renderOpener={(openModal: any) => (
                  <button
                    className="flex items-center w-full gap-2 text-xs p-2 rounded-md hover:bg-neutral-100
                      dark:hover:bg-neutral-800 text-neutral-600 hover:text-black dark:hover:text-white
                      dark:text-neutral-400 transition"
                    onClick={openModal}
                  >
                    <RiAddLine className="text-primary-alt text-base" />
                    <span className="font-medium">Add account</span>
                  </button>
                )}
                renderChildren={(closeModal: any) => (
                  <AddAccount closeModal={closeModal} />
                )}
              />

              <Modal
                renderOpener={(openModal: any) => (
                  <button
                    className="flex items-center w-full gap-2 text-xs p-2 rounded-md hover:bg-neutral-100
                      dark:hover:bg-neutral-800 text-neutral-600 hover:text-black dark:hover:text-white
                      dark:text-neutral-400 transition"
                    onClick={openModal}
                  >
                    <RiAddLine className="text-primary-alt text-base" />
                    <span className="font-medium">Add category</span>
                  </button>
                )}
                renderChildren={(closeModal: any) => (
                  <AddCategory closeModal={closeModal} />
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-4">
        <button onClick={toggleTheme} className="icon-btn">
          {theme === "light" ? <RiMoonLine /> : <RiSunLine />}
        </button>

        <div className="space-y-1">
          <a
            href="https://afordiazero.com"
            target="_blank"
            rel="noreferrer"
            className="text-primary-alt text-[10px] font-semibold hover:underline transition"
          >
            Afordia Zero Tech.
          </a>

          <div className="text-neutral-500 text-[10px] flex items-center gap-1">
            <span className="">
              <RiCopyrightLine />
            </span>
            Copyright {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
