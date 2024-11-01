import { createContext, useContext, useEffect, useState } from "react"
import { useTheme as useNextTheme } from "next-themes"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  attribute?: string
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  ...props
}: ThemeProviderProps) {
  return (
    <div>
      {children}
    </div>
  )
}