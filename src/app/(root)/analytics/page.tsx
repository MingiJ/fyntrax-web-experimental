import { RiBarChart2Line } from "react-icons/ri"

import Info from "@components/global/Info"

const Analytics = () => {
  return (
    <section className="space-y-8">
      <h1 className="title">Your Analytics</h1>

      <Info
        icon={<RiBarChart2Line />}
        title='Coming Soon'
        description="Analyze and optimize your finances."
      />
    </section>
  )
}

export default Analytics