import { useEffect, useState } from 'react'

import UserService from '@services/UserService'

import useUser from '@hooks/userUser'

const useCurrencies = () => {
  const [currencies, setCurrencies] = useState([])
  const [defaultCurrency, setDefaultCurrency] = useState('')

  // Get user.
  const user = useUser()

  useEffect(() => {
    if (user) {
      (async () => {
        const data = await UserService.getCurrencies({
          userId: user.id,
          accessToken: user.accessToken
        })

        setCurrencies(data.currencies)
        setDefaultCurrency(data.defaultCurrency)
      })()
    }
  }, [user])

  return {
    currencies,
    defaultCurrency
  }
}

export default useCurrencies