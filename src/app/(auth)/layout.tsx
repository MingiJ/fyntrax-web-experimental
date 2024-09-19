'use client'

import OnboardingLayout from '@components/onboarding/OnboardingLayout'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <OnboardingLayout layoutChildren={children} />
  )
}

export default AuthLayout