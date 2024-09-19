import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { IFigureDisplayContext, IFigureDisplayContextProvider } from './types'

const FigureDisplayContext = createContext<IFigureDisplayContext>({
  showFigures: true,
  toggleFigureDisplay: () => {}
})

const FigureDisplayContextProvider = ({
  children
}: IFigureDisplayContextProvider) => {
  const [showFigures, setShowFigures] = useState(true)

  useEffect(() => {
    const fyntraxFigureDisplay = localStorage.getItem('fyntrax-figure-display')

    if (fyntraxFigureDisplay) {
      const figureOptions = JSON.parse(fyntraxFigureDisplay)
      setShowFigures(figureOptions.showFigures)
    }
  }, [])

  const toggleFigureDisplay = useCallback(() => {
    setShowFigures((prev) => {
      localStorage.setItem('fyntrax-figure-display', JSON.stringify({ showFigures: !prev }))
      return !prev
    })
  }, [])

  const value = useMemo(() => ({
    showFigures,
    toggleFigureDisplay
  }), [showFigures, toggleFigureDisplay])

  return (
    <FigureDisplayContext.Provider value={value}>
      {children}
    </FigureDisplayContext.Provider>
  )
}

export default FigureDisplayContextProvider

export const useFigureDisplayContext = () => useContext(FigureDisplayContext)