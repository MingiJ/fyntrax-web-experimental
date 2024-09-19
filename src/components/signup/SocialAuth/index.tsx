import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { RiGoogleFill } from 'react-icons/ri'

import ButtonWithLoader from '@components/global/ButtonWithLoader'

const SocialAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  // Google auth.
  const onGoogleSignin = () => {
    setIsLoading(true)

    signIn('google', {
      callbackUrl: `${window.location.origin}`
    })
  }

  return (
    <div className='flex flex-col gap-2'>
      <ButtonWithLoader
        className="btn-outline"
        isLoading={isLoading}
        onClick={onGoogleSignin}
      >
        <i><RiGoogleFill /></i>
        <span>sign in with google</span>
      </ButtonWithLoader>
    </div>
  )
}

export default SocialAuth