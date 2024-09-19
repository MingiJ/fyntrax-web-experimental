import { useSession } from "next-auth/react"

const useUser = () => {
  const { data } = useSession()
  const user = data?.user
  return user
}

export default useUser