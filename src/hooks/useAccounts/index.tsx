'use client'

import { useCallback } from "react"
import { useSession } from "next-auth/react"

import AccountService from "@services/AccountService"

import useFetch from "@hooks/useFetch"

import { IAccount } from "@utils/interfaces"

const useAccounts = () => {
  // Get session.
  const { data: session } = useSession()
  const accessToken = session?.user.accessToken as string

  const getAccounts = useCallback(() => AccountService.list({ accessToken }), [accessToken])

  const { data, loading } = useFetch(getAccounts, { accessToken })
  
  return {
    accounts: data?.accounts as IAccount[],
    loading
  }
}

export default useAccounts