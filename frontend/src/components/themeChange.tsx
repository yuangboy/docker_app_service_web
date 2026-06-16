import React, { ReactNode } from 'react'
import {ThemeProvider} from "@/components/ui/theme-provider";

interface Props{
    children:React.ReactNode
}

export const ThemeChange = ({children}:Props) => {
  return (
    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
  )
}
