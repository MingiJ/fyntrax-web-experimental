'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiBankLine,
  RiCalculatorLine,
  RiSeedlingLine,
  RiStackLine
} from "react-icons/ri"
import { PiHandCoinsFill, PiPiggyBank } from "react-icons/pi"

import TemplateOption from "@components/onboarding/TemplateOption"
import ButtonWithLoader from "@components/global/ButtonWithLoader"

import { useOnboardingContext } from "@contexts/OnboardingContext"
import { useAlertContext } from "@contexts/AlertContext"

import UserService from "@services/UserService"

const ChooseTemplate = () => {
  const [loading, setLoading] = useState(false)
  const { back, push } = useRouter()
  const { data: session } = useSession()

  const { objectives, setObjectives, currency } = useOnboardingContext()
  const { setAlert } = useAlertContext()


  const handleSelectObjective = (objective: string) => {
    if (objectives.includes(objective)) {
      const filteredobjectives = objectives.filter((obj: string) => obj !== objective)
      setObjectives(filteredobjectives)

    } else {
      setObjectives([...objectives, objective])
    }
  }

  const handleButtonClick = async () => {
    setLoading(true)

    const res = await UserService.update({
      id: session?.user.id as string,
      accessToken: session?.user.accessToken as string,
      data: {
        objectives,
        defaultCurrency: currency.sign,
        currencies: [currency.sign],
        isOnboarded: true,
        onboardingStatus: 'complete'
      }
    })

    if (!res?.ok) {
      setLoading(false)
      setAlert({
        msg: res.message,
        type: 'error',
        show: true
      })
      return;
    }

    push('/')
  }

  return (
    <div className="space-y-10">
      <button
        className="text-primary-alt text-lg"
        onClick={back}
      >
        <RiArrowLeftLine />
      </button>

      {/* ******** HEADER ******** */}
      <div className="space-y-3">
        <h1 className="text-2xl lg:text-3xl font-bold">
          How would you like to use Fyntrax, <span className="capitalize">{session?.user.firstname}</span>?
        </h1>

        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Help us better adapt Fyntrax to suit your needs. You can choose as many ways as you like.
        </p>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2">
        <TemplateOption
          name="expense tracking"
          icon={<PiHandCoinsFill />}
          isSelected={objectives.includes('expense tracking')}
          selectTemplate={() => handleSelectObjective('expense tracking')}
        />

        <TemplateOption
          name="investing"
          icon={<RiSeedlingLine />}
          isSelected={objectives.includes('investing')}
          selectTemplate={() => handleSelectObjective('investing')}
        />

        <TemplateOption
          name="budgeting"
          icon={<RiCalculatorLine />}
          isSelected={objectives.includes('budgeting')}
          selectTemplate={() => handleSelectObjective('budgeting')}
        />

        <TemplateOption
          name="saving"
          icon={<PiPiggyBank />}
          isSelected={objectives.includes('saving')}
          selectTemplate={() => handleSelectObjective('saving')}
        />

        <TemplateOption
          name="asset management"
          icon={<RiStackLine />}
          isSelected={objectives.includes('asset management')}
          selectTemplate={() => handleSelectObjective('asset management')}
        />

        <TemplateOption
          name="debt management"
          icon={<RiBankLine />}
          isSelected={objectives.includes('debt management')}
          selectTemplate={() => handleSelectObjective('debt management')}
        />
      </div>

      {/* ******** CONTROLS ******** */}
      <ButtonWithLoader
        className="btn w-full"
        onClick={handleButtonClick}
        isLoading={loading}
      >
        start using fyntrax
        <RiArrowRightLine className='text-white text-base' />
      </ButtonWithLoader>
    </div>
  )
}

export default ChooseTemplate