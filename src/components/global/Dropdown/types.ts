export interface DropdownProps {
  active: string,
  options: IDropdownOption[],
  label?: string,
  setOption: Function,
  name: string
  className?: string
  defaultDisplay?: string
}


export interface IDropdownOption {
  name: string
  value: string
}
