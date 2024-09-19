import { SetStateAction, Dispatch } from "react"

export interface IOnboardingContext {
  currency: {
    name: string,
    sign: string
  }
  objectives: string[]
  setCurrency: Dispatch<SetStateAction<{ name: string, sign: string }>>
  setObjectives: Dispatch<SetStateAction<string[]>>
}

export interface IOnboardingContextProvider {
  children: React.ReactNode
}