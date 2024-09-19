import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

import useFetch from "@hooks/useFetch"

import UserService from "@services/UserService"

const useOnboardingStatus = () => {
  const [isOnboarded, setIsOnboarded] = useState(false)
  const [onboardingStatus, setOnboardingStatus] = useState('incomplete')
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      (async () => {
        const res = await UserService.getById({
          userId: session?.user.id as string,
          accessToken: session?.user.accessToken as string
        })
  
        if (!res.ok) return;
  
        setIsOnboarded(res.user.isOnboarded)
        setOnboardingStatus(res.user.onboardingStatus)
      })()
    }
  }, [session])

  return {
    isOnboarded,
    onboardingStatus
  }
}

export default useOnboardingStatus