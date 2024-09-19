import { useSession } from "next-auth/react"

const useAccessToken = () => {
  const { data } = useSession()
  const accessToken = data?.user.accessToken as string
  return accessToken
}

export default useAccessToken