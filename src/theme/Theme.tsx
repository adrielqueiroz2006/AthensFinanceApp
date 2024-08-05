import React, { Children, useEffect } from 'react'
import { createContext, useState } from 'react'

import { ThemeProvider as ThemeProviderStyled } from 'styled-components/native'
import darkTheme from './dark'
import lightTheme from './light'
import AsyncStorage from '@react-native-async-storage/async-storage'

export enum ThemeType {
  light = 'light',
  dark = 'dark',
}

const themes = {
  dark: darkTheme,
  light: lightTheme,
}

export const ThemeContext = createContext({
  theme: ThemeType.light,
  toggleTheme: () => {},
})

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(ThemeType.light)

  useEffect(() => {
    loadTheme()
  }, [])

  async function loadTheme() {
    const savedTheme = await AsyncStorage.getItem('@theme')
    if (
      savedTheme &&
      Object.values(ThemeType).includes(savedTheme as ThemeType)
    ) {
      setTheme(savedTheme as ThemeType)
    }
  }

  function toggleTheme() {
    let selectedTheme
    if (theme === ThemeType.light) {
      selectedTheme = ThemeType.dark
    } else {
      selectedTheme = ThemeType.light
    }

    setTheme(selectedTheme)
    AsyncStorage.setItem('@theme', selectedTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProviderStyled theme={themes[theme]}>
        {children}
      </ThemeProviderStyled>
    </ThemeContext.Provider>
  )
}
