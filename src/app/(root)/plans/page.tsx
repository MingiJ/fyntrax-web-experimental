import { RiCalendarCheckLine } from "react-icons/ri"

import Info from "@components/global/Info"

const Plans = () => {
  return (
    <>
      <section className="space-y-8">
        <h1 className="title">Your Plans</h1>

        <Info
          icon={<RiCalendarCheckLine />}
          title='Coming Soon'
          description="Make sure you hit your financial targets on time."
        />
      </section>
    </>
  )
}

export default Plans