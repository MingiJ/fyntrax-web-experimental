export interface SearchProps {
  placeholder: string,
  query: string,
  setQuery: Function,
  handleSearch: React.FormEventHandler<HTMLFormElement>,
  defaultValue: string | undefined,
}