import { useEffect, useState } from 'react'
import { Alert, StatusBar } from 'react-native'

import {
  ButtonWrapper,
  Container,
  Logo,
  Slogan,
  Title,
  Wrapper,
} from './styles'
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin'

import auth from '@react-native-firebase/auth'

import LogoIcon from '../../assets/app-logo.png'

import { Button } from '../../components/Button'

GoogleSignin.configure({
  webClientId:
    '924277056431-tpi2j8egkr7do2fl92obcgdgmmcr9h64.apps.googleusercontent.com',
})

export function SignIn() {
  const [isAutenticating, setIsAuthenticanting] = useState(false)

  useEffect(() => {
    GoogleSignin.signOut()
    setIsAuthenticanting(false)
  }, [])

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticanting(true)

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

      const response = await GoogleSignin.signIn()

      const googleCredential = auth.GoogleAuthProvider.credential(
        response.data?.idToken ?? null
      )

      return auth().signInWithCredential(googleCredential)
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            Alert.alert(
              'Entrar',
              'Não foi possível conectar-se a sua conta google.'
            )
            break
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert(
              'Entrar',
              'Não foi possível conectar-se a sua conta google.'
            )
            break
          default:
        }
      } else {
      }
    }
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Wrapper>
        <Logo source={LogoIcon} />

        <Title>Athens Finance</Title>

        <Slogan>Gestão de finanças</Slogan>
      </Wrapper>

      <ButtonWrapper>
        <Button
          title="Entrar com o Google"
          isWhite={'WHITE'}
          onPress={handleGoogleSignIn}
          isLoading={isAutenticating}
        />
      </ButtonWrapper>
    </Container>
  )
}
