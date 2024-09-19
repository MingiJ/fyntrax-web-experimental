import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

const NetworkStatusContext = createContext({ isOnline: true })

const NetworkStatusContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    window.addEventListener('offline', () => setIsOnline(false))
    window.addEventListener('online', () => setIsOnline(true))
    
    return () => {
      window.removeEventListener('offline', () => setIsOnline(false))
      window.removeEventListener('online', () => setIsOnline(true))
    }
  }, [])

  const value = useMemo(() => ({
    isOnline
  }), [isOnline])

  return (
    <NetworkStatusContext.Provider value={value}>
      {children}
    </NetworkStatusContext.Provider>
  )
}

export default NetworkStatusContextProvider

export const useNetworkStatus = () => useContext(NetworkStatusContext)