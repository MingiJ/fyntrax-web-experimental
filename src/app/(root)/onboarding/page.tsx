'use client'

import Link from "next/link"
import { useSession } from "next-auth/react"
import { MdWavingHand } from "react-icons/md"
import { RiArrowRightLine } from "react-icons/ri"

const Onboarding = () => {
  const { data: session} = useSession()

  return (
    <div className="space-y-10">
      {/* ******** HEADER ******** */}
      <div className="space-y-3">
        <h1 className="text-2xl lg:text-3xl font-bold capitalize">
          Hello {session?.user.firstname}&nbsp;
          <MdWavingHand className='inline text-yellow-400 dark:text-yellow-300 text-3xl lg:text-4xl' />
        </h1>

        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Welcome to Fyntrax! We&apos;ll help you get set up for an optimal financial experience.
        </p>
      </div>

      <div className=""></div>

      {/* ******** CONTROLS ******** */}
      <div className="space-y-2">
        <Link
          href='/onboarding/choose-currency'
          className="btn w-full"
        >
          continue
          <RiArrowRightLine className='text-white text-base' />
        </Link>
      </div>
    </div>
  )
}

export default Onboarding