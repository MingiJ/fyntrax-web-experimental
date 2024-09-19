'use client'

import { useSession } from 'next-auth/react'

import OnboardingLayout from '@components/onboarding/OnboardingLayout'

import OnboardingContextProvider from '@contexts/OnboardingContext'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <OnboardingContextProvider>
      <OnboardingLayout layoutChildren={children} />
    </OnboardingContextProvider>
  )
}

export default Layout