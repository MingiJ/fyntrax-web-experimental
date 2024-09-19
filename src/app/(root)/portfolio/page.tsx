import { RiStackLine } from "react-icons/ri"

import Info from "@components/global/Info"

const Portfolio = () => {
  return (
    <>
      <section className="space-y-8">
        <h1 className="title">Your Portfolio</h1>

        <Info
          icon={<RiStackLine />}
          title='Coming Soon'
          description="Keep track of your investments."
        />
      </section>
    </>
  )
}

export default Portfolio