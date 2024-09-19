import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { RiUserStarLine } from 'react-icons/ri'

import ButtonWithLoader from "@components/global/ButtonWithLoader"

const DemoAccountLogin = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { push } = useRouter()

  const handleDemoLogin = async () => {
    setIsLoading(true)

    const res = await signIn('credentials', {
      email: 'demo@fyntrax.com',
      password: '12345678',
      redirect: false
    })

    if (!res?.ok) {
      setIsLoading(false)
      return
    }

    push('/')
  }

  return (
    <ButtonWithLoader
      className='btn-outline'
      isLoading={isLoading}
      onClick={handleDemoLogin}
    >
      <i><RiUserStarLine /></i>
      Use Demo Account
    </ButtonWithLoader>
  )
}

export default DemoAccountLogin