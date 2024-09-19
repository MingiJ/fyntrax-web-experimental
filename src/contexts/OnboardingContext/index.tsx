import { createContext, useMemo, useState, useContext } from "react"
import { IOnboardingContext, IOnboardingContextProvider } from "./types"

const OnboardingContext = createContext<IOnboardingContext>({
  currency: {
    name: 'kenyan shilling',
    sign: 'kes'
  },
  objectives: [],
  setCurrency: () => {},
  setObjectives: () => {}
})

const OnboardingContextProvider = ({
  children
}: IOnboardingContextProvider) => {
  const [currency, setCurrency] = useState({
    name: 'kenyan shilling',
    sign: 'kes'
  })
  const [objectives, setObjectives] = useState<string[]>([])

  const value = useMemo(() => ({
    currency,
    setCurrency,
    objectives,
    setObjectives
  }), [currency, objectives])

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export default OnboardingContextProvider

export const useOnboardingContext = () => useContext(OnboardingContext)