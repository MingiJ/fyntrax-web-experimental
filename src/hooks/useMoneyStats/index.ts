import { useCallback, useEffect, useState } from 'react'

import useAccessToken from "@hooks/useAccessToken"
import useFetch from "@hooks/useFetch"

import UserService from "@services/UserService"

const useMoneyStats = (currency: string) => {
  const accessToken = useAccessToken()
  
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (accessToken) {
      // setLoading(true);

      (async () => {
        const data = await UserService.getMoneyStats({
          accessToken,
          currency
        })

        setData(data)
        setLoading(false)
      })()
    }
  }, [accessToken, currency])

  return {
    loading,
    stats: data?.stats
  }
}

export default useMoneyStats