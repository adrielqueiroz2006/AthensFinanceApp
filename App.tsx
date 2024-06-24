import 'react-native-get-random-values'

import { ThemeProvider } from 'styled-components/native'
import { StatusBar } from 'react-native'
import { AppProvider, UserProvider } from '@realm/react'

import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from '@expo-google-fonts/inter'

import theme from './src/theme'

const REALM_APP_ID: string = process.env.REALM_APP_ID || ''

import { RealmProvider } from './src/libs/realm'

import { Routes } from './src/routes'
import { SignIn } from './src/screens/SignIn'
import { Loading } from './src/components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <UserProvider fallback={SignIn}>
          <RealmProvider>
            <Routes />
          </RealmProvider>
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
