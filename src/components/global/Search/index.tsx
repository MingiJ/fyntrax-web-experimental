'use client'

import { RiCloseLine, RiSearchLine } from "react-icons/ri"

import { SearchProps } from '@components/global/Search/types'

const Search = ({
  placeholder,
  query,
  setQuery,
  handleSearch,
  defaultValue
}: SearchProps) => {
  return (
    <form
      className="relative w-full h-10 flex items-center"
      onSubmit={handleSearch}
    >
      <button
        type="submit"
        className="absolute flex items-center justify-center h-full pl-3 pr-2 text-primary-alt"
      >
        <RiSearchLine />
      </button>

      <input
        type="text"
        className="w-full h-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800
        rounded-xl pl-[2.4rem] pr-10 text-sm"
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query.length > 0 && (
        <button
          type="button"
          className="absolute right-0 flex items-center justify-center h-full px-3 text-primary-alt"
          onClick={() => setQuery('')}
        >
          <RiCloseLine />
        </button>
      )}
    </form>
  )
}

export default Search