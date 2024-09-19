import { RiArrowDropDownLine } from "react-icons/ri"

const SpendingLimit = () => {
  return (
    <div className="p-4 sm:p-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50
    dark:bg-neutral-900 space-y-4 h-max">
      {/* *********** TITLE & DROPDOWN *********** */}
      <div className="flex items-center justify-between">
        <h5 className="font-semibold">Spending Limit</h5>
        
        {/* *********** DROPDOWN *********** */}
        <div className="dropdown">
          <div
            className="px-3 py-2 border border-neutral-300 dark:border-neutral-800 flex items-center justify-between
            gap-10 rounded-lg mb-2 cursor-pointer"
            tabIndex={0}
          >
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Day</span>
            <span className="text-primary-alt">
              <RiArrowDropDownLine />
            </span>
          </div>
          
          <div tabIndex={0} className="dropdown-content menu p-2 shadow bg-white/90 dark:bg-neutral-900 w-full
          backdrop-blur rounded-xl text-xs font-medium border border-neutral-300 dark:border-neutral-800">
            <div className="p-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg text-neutral-500
            dark:text-neutral-400 hover:text-black dark:hover:text-white">
              Month
            </div>
            
            <div className="p-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg text-neutral-500
            dark:text-neutral-400 hover:text-black dark:hover:text-white">
              Year
            </div>
        
          </div>
        </div>
      </div>

      {/* *********** LIMIT BAR *********** */}
      <div className="w-full h-6 bg-neutral-200 dark:bg-neutral-800 rounded-md relative">
        <div className="absolute h-full w-1/2 bg-primary-alt rounded-md"></div>
      </div>

      <div className="flex justify-between">
        <div className="flex items-start gap-2">
          <div className="text-3xl text-primary-alt font-light">$0</div>
          <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">/ $75</div>
        </div>

        <div className="text-lg text-primary-alt">20%</div>
      </div>
    </div>
  )
}

export default SpendingLimit