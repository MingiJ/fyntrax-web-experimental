'use client'

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import {
  RiAddLine,
  RiCheckLine,
  RiCloseCircleLine,
  RiGroupLine,
  RiUserAddLine
} from "react-icons/ri"

import ErrorMsg from "@components/global/ErrorMsg"
import Dropdown from "@components/global/Dropdown"
import ButtonWithLoader from "@components/global/ButtonWithLoader"
import { AddAccountProps } from "@components/accounts/AddAccount/types"

import AccountService from "@services/AccountService"

import validate from "@utils/validate"

import AccountValidation from "@validations/AccountValidation"

import useCurrencies from "@hooks/useCurrencies"

import { useAlertContext } from "@contexts/AlertContext"

const AddAccount = ({
  closeModal,
  account,
  edit
}: AddAccountProps) => {
  const [state, setState] = useState({
    name: '',
    description: '',
    number: '',
    balance: 0,
    type: {
      name: '',
      value: ''
    },
    provider: {
      name: '',
      value: ''
    },
    currency: {
      name: '',
      value: ''
    }
  })
  const [errors, setErrors] = useState<any>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [editError, setEditError] = useState<string | null>(null)
  const [availableCurrencies, setAvailableCurrencies] = useState([])
  
  // Get session.
  const { data: session } = useSession()
  const accessToken = session?.user.accessToken as string

  // Get currencies.
  const { defaultCurrency, currencies } = useCurrencies()

  // Get alert context.
  const { setAlert } = useAlertContext()

  // Get push.
  const { push } = useRouter()

  // Handle input change.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

    if (errors && errors[e.target.name]) {
      setErrors((prev: any) => ({ ...prev, [e.target.name]: null }))
    }
  }

  // Handle dropdown.
  const handleDropdown = (name: string, value: any) => {
    setState(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors && errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: null }))
    }
  }

  // Handle form submission.
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    closeModal: any
  ) => {
    e.preventDefault()
    setIsSubmitted(true)

    // Prep data.
    const data = {
      ...state,
      currency: state.currency.value,
      provider: state.provider.value,
      type: state.type.value,
    }

    // Validate account data.
    const { isValid, result } = validate(AccountValidation.create, data)

    if (!isValid) {
      setIsSubmitted(false)
      setErrors(result)
      return
    }

    let res;

    // Update or create account.
    if (edit) {
      res = await AccountService.update({
        id: account._id,
        data,
        accessToken
      })

    } else {
      res = await AccountService.create({
        data,
        accessToken
      })
    }

    if (!res.ok) {
      setIsSubmitted(false)
      setEditError(res.message)
      return
    }

    setIsSubmitted(false)
    closeModal()
    setAlert({
      msg: `Account ${edit ? 'updated' : 'added'} successfully.`,
      type: 'success',
      show: true
    })
    push(`/accounts/${res.accountId}`)
  }

  // Get account if edit.
  useEffect(() => {
    if (currencies) {
      setAvailableCurrencies(currencies)
    }

    if (!edit && defaultCurrency) {
      setState(prev => ({
        ...prev,
        currency: {
          name: defaultCurrency,
          value: defaultCurrency
        }
      }))
    }

    if (edit && account) {
      setState(prev => ({
        ...prev,
        ...account,
        provider: {
          name: account.provider,
          type: account.provider
        },
        type: {
          name: account.type,
          value: account.type
        },
        currency: {
          name: account.currency,
          value: account.currency
        },
      }))
    }
  }, [edit, account, defaultCurrency, currencies])

  return (
    <form className="space-y-8" onSubmit={e => handleSubmit(e, closeModal)}>
      {/* *********** HEADER *********** */}
      <div className="">
        <h2 className="title">{edit ? 'Edit' : 'New'} Account</h2>
      </div>

      {editError && <ErrorMsg msg={editError} />}
      
      {/* *********** CONTENT *********** */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* *********** LEFT *********** */}
        <div className="space-y-10">
          <div className="space-y-3">
            <Dropdown
              name="currency"
              label="choose currency"
              active={state.currency.name}
              options={availableCurrencies.map((curr: string) => ({ name: curr.toUpperCase(), value: curr }))}
              setOption={handleDropdown}
            />
            {errors?.currency && <ErrorMsg msg={errors.currency} />}
          </div>

          {/* *********** INPUTS *********** */}
          <div className="space-y-8">

            {/* *********** CURRENT BALANCE *********** */}
            <div className="space-y-3">
              <input
                name='balance'
                value={state.balance || ''}
                onChange={handleChange}
                type="number"
                placeholder="0.00 * (Current Balance)"
                min={0}
                step={0.01}
                className='text-xl xs:text-2xl font-semibold w-full outline-none pb-7 border-b border-neutral-200
                bg-transparent dark:border-neutral-800 focus:border-black dark:focus:border-white transition'
              />
              {errors?.balance && <ErrorMsg msg={errors.balance} />}
            </div>
            
            {/* *********** ACCOUNT NAME *********** */}
            <div className="space-y-3">
              <input
                name='name'
                value={state.name}
                onChange={handleChange}
                type="text"
                placeholder="Add Name * (.e.g. Savings - Barclays)"
                className={`text-sm xs:text-base w-full outline-none pb-7 border-b border-neutral-200
                bg-transparent dark:border-neutral-800 focus:border-black dark:focus:border-white transition
                ${errors?.name && '!border-red-500'}`}
              />
              {errors?.name && <ErrorMsg msg={errors.name} />}
            </div>

            {/* *********** ACCOUNT NUMBER *********** */}
            <input
              name='number'
              value={state.number}
              onChange={handleChange}
              type="text"
              placeholder="Add Account Number (.e.g. 000555000)"
              className='text-sm xs:text-base w-full outline-none pb-7 border-b border-neutral-200
              bg-transparent dark:border-neutral-800 focus:border-black dark:focus:border-white transition'
            />
            
            <div className="flex flex-col sm:flex-row gap-2">

              {/* *********** ACCOUNT TYPE *********** */}
              <div className="w-full">
                <Dropdown
                  name="type"
                  active={state.type.name}
                  options={[
                    {name: 'savings', value: 'savings'},
                    {name: 'current', value: 'current'},
                    {name: 'investment', value: 'investment'},
                  ]}
                  label='type'
                  setOption={handleDropdown}
                  className='!w-full'
                />
                {errors?.type && <ErrorMsg msg={errors.type} />}
              </div>
              
              {/* *********** ACCOUNT PROVIDER *********** */}
              <Dropdown
                name="provider"
                active={state.provider.name}
                options={[
                  {name: 'M-Pesa', value: 'mpesa'},
                  {name: 'Bank', value: 'bank'},
                  {name: 'Paypal', value: 'paypal'},
                ]}
                label='provider'
                setOption={handleDropdown}
                className='!w-full'
              />
            </div>
            
            {/* *********** ACCOUNT DESCRIPTION *********** */}
            <textarea
              name='description'
              value={state.description}
              onChange={handleChange}
              placeholder="Add Description (.e.g. My savings account with Barclays)"
              className='text-sm xs:text-base w-full outline-none pb-7 border-b border-neutral-200
              bg-transparent dark:border-neutral-800 focus:border-black dark:focus:border-white transition'
            ></textarea>
          </div>
        </div>
        
        {/* *********** RIGHT *********** */}
        <div className="">
          {/* *********** PEOPLE *********** */}
          <div className="border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50
          dark:bg-neutral-900/50 backdrop-blur flex flex-col items-center justify-center gap-5 p-7 rounded-xl
          h-full border-dashed">
            <RiGroupLine className="text-primary-alt text-6xl" />

            <div className="text-center space-y-1">
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Coming Soon
              </h3>

              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Invite people to collaborate with in managing this account.
              </p>
            </div>

            <button type="button" className="btn-outline">
              <i><RiUserAddLine /></i>
              add collaborator
            </button>
          </div>
        </div>
      </div>

      {/* *********** CONTROLS *********** */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 w-full border-t border-neutral-200
      dark:border-neutral-800 pt-8">
        <ButtonWithLoader
          type="submit"
          className="btn flex-1"
          isLoading={isSubmitted}
        >
          {edit ? 
            <>
              <i><RiCheckLine /></i>
              save
            </> :
            <>
              <i><RiAddLine /></i>
              add account
            </>
          }
        </ButtonWithLoader>

        <ButtonWithLoader
          type="button"
          className="btn-outline flex-1"
          isLoading={isSubmitted}
          onClick={closeModal}
        >
          <i><RiCloseCircleLine /></i>
          cancel
        </ButtonWithLoader>
      </div>
    </form>
  )
}

export default AddAccount
