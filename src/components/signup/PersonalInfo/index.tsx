import { useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { RiArrowLeftLine } from "react-icons/ri"

import Input from "@components/global/Input"
import ButtonWithLoader from "@components/global/ButtonWithLoader"
import { GetStartedProps } from "@components/signup/GetStarted/types"
import SocialAuth from '@components/signup/SocialAuth'

import UserService from "@services/UserService"

import { registerSchema } from "@validations/AuthValidation"

import validate from "@utils/validate"

const PersonalInfo = ({
  state,
  setState
}: GetStartedProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<any>(null)

  const { push } = useRouter()

  // On input change.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev: any) => ({
      ...prev,
      individual: {
        ...prev.individual,
        [e.target.name]: e.target.value,
      }
    }))
    setErrors((prev: any) => ({
      ...prev,
      [e.target.name]: null
    }))
  }

  // On form submit.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitted(true)

    const { isValid, result } = validate(registerSchema, state.individual)

    if (!isValid) {
      setIsSubmitted(false)
      setErrors(result)
      return;
    }

    if (state.plan === 'individual') {
      const res = await UserService.createWithCredentials(state.individual)
      
      if (!res.ok) {
        setIsSubmitted(false)
        return;
      }

      // Move to next tab.
      setState((prev: any) => ({ ...prev, tab: 'verify-account' }))
    }
    
  }

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      <div className="">
        <button
          className="text-primary-alt text-lg"
          onClick={() => setState((prev: any) => ({ ...prev, tab: 'get-started' }))}
          type='button'
        >
          <RiArrowLeftLine />
        </button>
      </div>

      {/* ******** HEADER ******** */}
      <div className="space-y-3">
        <h1 className="text-2xl lg:text-3xl font-bold">Personal Account</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Create your personal account to start using Fyntrax.
        </p>
      </div>

      {/* ******** OPTIONS ******** */}
      <div className="grid grid-cols-1 gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            name='firstname'
            label='first name *'
            type='text'
            value={state.individual.firstname}
            onChange={handleChange}
            err={errors?.firstname}
            info='Enter your first name.'
            placeholder='John'
          />
          
          <Input
            name='lastname'
            label='last name *'
            type='text'
            value={state.individual.lastname}
            onChange={handleChange}
            err={errors?.lastname}
            info='Enter your last name.'
            placeholder='Doe'
          />
        </div>

        <Input
          name='email'
          label='email *'
          type='email'
          value={state.individual.email}
          onChange={handleChange}
          err={errors?.email}
          info='Enter your email address.'
          placeholder='name@example.com'
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            name='password'
            label='password *'
            type='password'
            value={state.individual.password}
            onChange={handleChange}
            err={errors?.password}
            info='Set your password.'
            placeholder='******'
          />
          
          <Input
            name='passwordConfirm'
            label='confirm password *'
            type='password'
            value={state.individual.passwordConfirm}
            onChange={handleChange}
            err={errors?.passwordConfirm}
            info='Confirm your password.'
            placeholder='******'
          />
        </div>
      </div>

      {/* ******** CONTROLS ******** */}
      <div className="flex flex-col gap-5 text-center">
        <div className="space-y-3">
          <ButtonWithLoader
            className="btn w-full"
            type="submit"
            isLoading={isSubmitted}
          >
            start 30-day free trial
          </ButtonWithLoader>

          <p className="text-xs text-neutral-700 dark:text-neutral-300">
            Already have an account? <Link href='/login' className="text-primary-alt">Login</Link>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <hr className='flex-1 border-neutral-200 dark:border-neutral-800' />
          <span className="text-xs text-neutral-600 dark:text-neutral-400">OR</span>
          <hr className="flex-1 border-neutral-200 dark:border-neutral-800" />
        </div>

        <SocialAuth />
      </div>
    </form>
  )
}

export default PersonalInfo