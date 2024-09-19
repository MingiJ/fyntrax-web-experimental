import { ReactNode, ButtonHTMLAttributes } from 'react'

export interface ButtonWithLoaderProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean,
  children: ReactNode,
}