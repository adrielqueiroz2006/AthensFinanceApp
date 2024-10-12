import { useEffect, useState } from 'react'

import 'react-native-get-random-values'

import { ThemeProvider } from './src/theme/Theme'

import { ExchangeProvider } from './src/contexts/ExchangeContext'

import { GestureHandlerRootView } from 'react-native-gesture-handler'

import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from '@expo-google-fonts/inter'

import { Routes } from './src/routes'

import { Loading } from './src/components/Loading'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold })
  const [savedTheme, setSavedTheme] = useState('')

  async function fetchTheme() {
    const theme = await AsyncStorage.getItem('@theme')

    setSavedTheme(theme ? theme : '')
  }

  useEffect(() => {
    fetchTheme()
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ExchangeProvider>
          <Routes />
        </ExchangeProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}
