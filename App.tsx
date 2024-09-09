import 'react-native-get-random-values'

import { ThemeProvider } from './src/theme/Theme'

import { StatusBar } from 'react-native'
import { AppProvider, UserProvider } from '@realm/react'

import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from '@expo-google-fonts/inter'

const REALM_APP_ID: string = process.env.REALM_APP_ID || ''

import { RealmProvider } from './src/libs/realm'

import { Routes } from './src/routes'
import { SignIn } from './src/screens/SignIn'
import { Loading } from './src/components/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold })
  const [savedTheme, setSavedTheme] = useState('')

  async function fetchTheme() {
    const theme = await AsyncStorage.getItem('@theme')

    setSavedTheme(theme ? theme : '')
  }

  useEffect(() => {
    fetchTheme()
  }, [])

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider>
        <UserProvider fallback={SignIn}>
          <RealmProvider>
            <Routes />
          </RealmProvider>
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
