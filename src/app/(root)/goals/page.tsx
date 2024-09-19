import { RiFlagLine } from "react-icons/ri"

import Info from "@components/global/Info"

const Goals = () => {
  return (
    <section className="space-y-8">
      <h1 className="title">Your Goals</h1>

      <Info
        icon={<RiFlagLine />}
        title='Coming Soon'
        description="Create financial goals to help you achieve your bottomline."
      />
    </section>
  )
}

export default Goals