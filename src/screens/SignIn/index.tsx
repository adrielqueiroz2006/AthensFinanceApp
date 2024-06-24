import { useEffect, useState } from 'react'
import {
  ButtonWrapper,
  Container,
  Logo,
  Slogan,
  Title,
  Wrapper,
} from './styles'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Realm, useApp } from '@realm/react'

import LogoIcon from '../../assets/app-logo.png'

import { Button } from '../../components/Button'

const WEB_CLIENT_ID = process.env.WEB_CLIENT_ID
const IOS_CLIENT_ID = process.env.IOS_CLIENT_ID

import { Alert, StatusBar } from 'react-native'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
})

export function SignIn() {
  const [isAutenticating, setIsAuthenticanting] = useState(false)
  const app = useApp()

  useEffect(() => {
    GoogleSignin.signOut()
  }, [])

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticanting(true)

      const { idToken } = await GoogleSignin.signIn()

      if (idToken) {
        const credentials = Realm.Credentials.jwt(idToken)

        await app.logIn(credentials)
      } else {
        Alert.alert(
          'Entrar',
          'Não foi possível conectar-se a sua conta google.'
        )
        setIsAuthenticanting(false)
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta google.')
      setIsAuthenticanting(false)
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
          onPress={handleGoogleSignIn}
          isLoading={isAutenticating}
        />
      </ButtonWrapper>
    </Container>
  )
}
