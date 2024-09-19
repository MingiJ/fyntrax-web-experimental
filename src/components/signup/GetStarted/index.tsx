import Link from "next/link"
import { RiBuildingLine, RiUser4Line } from "react-icons/ri"
import { RxRocket } from "react-icons/rx"

import PlanCard from "@components/signup/PlanCard"
import Modal from "@components/global/Modal"
import Info from "@components/global/Info"

import { GetStartedProps } from "./types"

const GetStarted = ({
  state,
  setState
}: GetStartedProps) => {
  const selectPlan = (plan: string) => {
    setState((prev: any) => ({ ...prev, plan}))
  }

  return (
    <div className="space-y-10">
      {/* ******** HEADER ******** */}
      <div className="space-y-3">
        <h1 className="text-2xl lg:text-3xl font-bold">Get Started with Fyntrax</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-[150%]">
          We&apos;re excited to have you join us! Please choose the version of Fyntrax that suits your needs best.
        </p>
      </div>

      {/* ******** OPTIONS ******** */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* ******** FYNTRAX FOR INDIVIDUALS ******** */}
        <PlanCard
          title="Fyntrax for Individuals"
          description="Stay on top of your personal finances."
          icon={<RiUser4Line />}
          selectPlan={selectPlan}
          plan='individual'
          isActive={state.plan === 'individual'}
        />
        
        {/* ******** FYNTRAX FOR BUSINESSES ******** */}
        <Modal
          renderOpener={(openModal: any) => (
            <div onClick={openModal}>
              <PlanCard
                title="Fyntrax for Businesses"
                description="Streamline finances for your business."
                icon={<RiBuildingLine />}
                selectPlan={selectPlan}
                plan='individual'
                isActive={state.plan === 'business'}
              />
            </div>
          )}
          renderChildren={() => (
            <div className="space-y-8">
              <h2 className="title">Fyntrax for Businesses</h2>

              <Info
                icon={<RiBuildingLine />}
                title='Coming soon'
                description="Fyntrax for Businesses is still under development." 
              />
            </div>
          )}
        />

        {/* ******** FYNTRAX FOR STARTUPS ******** */}
        <Modal
          renderOpener={(openModal: any) => (
            <div onClick={openModal}>
              <PlanCard
                title="Fyntrax for Startups"
                description="Streamline finances for your startup."
                icon={<RxRocket />}
                selectPlan={selectPlan}
                plan='individual'
                isActive={state.plan === 'startup'}
              />
            </div>
          )}
          renderChildren={() => (
            <div className="space-y-8">
              <h2 className="title">Fyntrax for Startups</h2>

              <Info
                icon={<RxRocket />}
                title='Coming soon'
                description="Fyntrax for Startups is still under development." 
              />
            </div>
          )}
        />
      </div>

      {/* ******** CONTROLS ******** */}
      <div className="flex flex-col gap-3 text-center">
        <button
          className="btn w-full"
          onClick={() => setState((prev: any) => {
            if (state.plan === 'individual') {
              return {
                ...prev,
                tab: 'personal-info'
              }
            }
            
            return {
              ...prev,
              tab: 'organization-info'
            }
          })}
        >
          continue as {state.plan}
        </button>

        <p className="text-xs">
          Already have an account? <Link href='/login' className="text-primary-alt">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default GetStarted