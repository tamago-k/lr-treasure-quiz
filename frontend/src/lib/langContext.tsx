import React, { createContext, useContext, useMemo } from 'react'

type LangContextType = {
  language: 'ja' | 'en'
  setLanguage: React.Dispatch<React.SetStateAction<'ja' | 'en'>>
}

const LangContext = createContext<LangContextType | undefined>(undefined)

type LangProviderProps = {
  children: React.ReactNode
  language: 'ja' | 'en'
  setLanguage: React.Dispatch<React.SetStateAction<'ja' | 'en'>>
}

export const LangProvider = ({ children, language, setLanguage }: LangProviderProps) => {
  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage])

  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => {
  const context = useContext(LangContext)
  if (!context) {
    throw new Error('useLang must be used within a LangProvider')
  }
  return context
}
