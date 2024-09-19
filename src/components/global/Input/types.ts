export interface InputProps {
  err?: string,
  label: string,
  name: string,
  info?: string,
  placeholder: string,
  type?: string,
  value: string | number,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  required?: boolean,
  labelStyle?: string
}