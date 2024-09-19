import React from "react"

export interface IThemeContext {
  theme: string,
  toggleTheme: React.MouseEventHandler<HTMLButtonElement>
}

export interface IThemeContextProvider {
  children: React.ReactNode
}