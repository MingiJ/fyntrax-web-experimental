'use client'

import { useState } from 'react'

import GetStarted from '@components/signup/GetStarted'
import PersonalInfo from '@components/signup/PersonalInfo'
import VerifyAccount from '@components/signup/VerifyAccount'

const Signup = () => {
  const [state, setState] = useState({
    individual: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    business: {
      name: '',
      email: ''
    },
    plan: 'individual',
    tab: 'get-started'
  })

  return (
    <>
      {state.tab === 'get-started' && <GetStarted state={state} setState={setState} />}
      {state.tab === 'personal-info' && <PersonalInfo state={state} setState={setState} />}
      {state.tab === 'verify-account' && <VerifyAccount state={state} setState={setState} />}
    </>
  )
}

export default Signup