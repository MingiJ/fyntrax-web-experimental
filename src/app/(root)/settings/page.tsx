import { RiSettingsLine } from "react-icons/ri"

import Info from "@components/global/Info"

const Settings = () => {
  return (
    <>
      <section className="space-y-8">
        <h1 className="title">Settings</h1>

        <Info
          icon={<RiSettingsLine />}
          title='Coming Soon'
          description="Configure Fyntrax to suit your needs."
        />
      </section>
    </>
  )
}

export default Settings