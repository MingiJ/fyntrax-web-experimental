'use client'

import { useEffect, useRef, useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { RiArrowLeftLine } from "react-icons/ri"

import { GetStartedProps } from "../GetStarted/types"
import ErrorMsg from '@components/global/ErrorMsg'
import ButtonWithLoader from '@components/global/ButtonWithLoader'

import UserService from '@services/UserService'
import isEmpty from '@utils/isEmpty'

const VerifyAccount = ({
  state,
  setState
}: GetStartedProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const { push } = useRouter()

  useEffect(() => {
    const form = document.querySelector('#verificationForm')
    const inputs = document.querySelectorAll('input.verification-code')

    const handleInput = (e: any) => {
      if (error) setError(null);
      const input = e.target
      const nextInput = input.nextElementSibling

      if (nextInput && input.value) {
        nextInput.focus()

        if (nextInput.value) {
          nextInput.select()
        }
      }
    }

    const handlePaste = (e: any) => {
      e.preventDefault()
      const paste = e.clipboardData.getData('text')
      inputs.forEach((input: any, i) => {
        input.value = paste[i] || ''
      })
    }

    const handleBackspace = (e: any) => {
      const input = e.target
      if (input.value) {
        input.value = ''
        return
      }

      if (input.previousElementSibling) {
        input.previousElementSibling.focus()
      }
    }

    const handleArrowLeft = (e: any) => {
      const previousInput = e.target.previousElementSibling
      if (!previousInput) return;
      previousInput.focus()
    }

    const handleArrowRight = (e: any) => {
      const nextInput = e.target.nextElementSibling
      if (!nextInput) return;
      nextInput.focus()
    }

    form?.addEventListener('input', handleInput)

    inputs.forEach((input: any, idx: number) => {
      input.addEventListener('keydown', (e: any) => {
        if (e.keyCode === 8) {
          handleBackspace(e)
        }

        if (e.keyCode === 37) {
          handleArrowLeft(e)
        }

        if (e.keyCode === 39) {
          handleArrowRight(e)
        }
      })

      input.addEventListener('paste', handlePaste)
    })
  }, [error])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitted(true)
    
    const code: string[] = []
    document.querySelectorAll('input.verification-code').forEach((elem: any) => code.push(elem.value))
    const otpValue = code.join('')
    
    if (isEmpty(otpValue)) {
      setError('Code must be entered')
      setIsSubmitted(false)
      return
    }

    const res = await UserService.verifyAccount({
      email: state.individual.email,
      otpValue
    })

    if (!res.ok) {
      setError(res.message || res.errors.otpValue)
      setIsSubmitted(false)
      return
    }
    
    // Login user.
    const signinRes = await signIn('credentials', {
      email: state.individual.email,
      password: state.individual.password,
      redirect: false
    })

    // Move to onboarding.
    if (signinRes?.ok) {
      push('/onboarding')
    }
  }

  return (
    <form id='verificationForm' className="space-y-10" onSubmit={handleSubmit}>
      <div className="">
        <button
          className="text-primary-alt text-lg"
          type='button'
          onClick={() => setState((prev: any) => ({ ...prev, tab: 'personal-info' }))}
        >
          <RiArrowLeftLine />
        </button>
      </div>

      {/* ******** HEADER ******** */}
      <div className="space-y-3">
        <h1 className="text-2xl lg:text-3xl font-bold">Verify Account</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          We&apos;ve sent a code to your email. Enter it to confirm your account and continue.
        </p>
      </div>

      <div className="grid grid-cols-6 gap-2">
        <input
          type="tel"
          maxLength={1}
          pattern='[0-9]'
          min={0}
          max={9}
          className="verification-code"
        />
        <input
          type="tel"
          maxLength={1}
          pattern='[0-9]'
          min={0}
          max={9}
          className="verification-code"
        />
        <input
          type="tel"
          maxLength={1}
          pattern='[0-9]'
          min={0}
          max={9}
          className="verification-code"
        />
        <input
          type="tel"
          maxLength={1}
          pattern='[0-9]'
          min={0}
          max={9}
          className="verification-code"
        />
        <input
          type="tel"
          maxLength={1}
          pattern='[0-9]'
          min={0}
          max={9}
          className="verification-code"
        />
        <input
          type="tel"
          maxLength={1}
          pattern='[0-9]'
          min={0}
          max={9}
          className="verification-code"
        />
      </div>

      {error && <ErrorMsg msg={error} />}

      {/* ******** CONTROLS ******** */}
      <div className="flex flex-col gap-3 text-center">
        <ButtonWithLoader
          type='submit'
          className="btn w-full"
          isLoading={isSubmitted}
        >
          confirm account
        </ButtonWithLoader>

        <p className="text-xs">
          Already have an account? <Link href='/login' className="text-primary-alt">Login</Link>
        </p>
      </div>
    </form>
  )
}

export default VerifyAccount