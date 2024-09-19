import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { IAlertContext } from './types'

export const AlertContext = createContext<IAlertContext>({
  type: '',
  show: false,
  msg: '',
  setAlert: () => {},
  clearAlert: () => {}
})

const AlertContextProvider = ({
  children
}: { children: React.ReactNode }) => {
  const [state, setState] = useState<IAlertContext>({
    msg: '',
    type: '',
    show: false,
    setAlert: () => {},
    clearAlert: () => {}
  })

  const setAlert = useCallback((data: Partial<IAlertContext>) => {
    setState(prev => ({
      ...prev,
      ...data
    }))
  }, [])

  const clearAlert = useCallback(() => {
    setAlert({
      msg: '',
      type: '',
      show: false
    })
  }, [setAlert])

  const value = useMemo(() => ({
    ...state,
    setAlert,
    clearAlert
  }), [state, setAlert, clearAlert])

  return (
    <AlertContext.Provider value={value} >
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContextProvider

export const useAlertContext = () => useContext(AlertContext)