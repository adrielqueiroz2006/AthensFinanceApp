import { useContext } from 'react'
import { Switch, TouchableOpacity } from 'react-native'

import { useExchanges } from '../../contexts/ExchangeContext'

import Icon from 'react-native-vector-icons/MaterialIcons'

import auth from '@react-native-firebase/auth'

import { ThemeContext, ThemeType } from '../../theme/Theme'

import { Container, Greeting, Message, Name, Picture, Wrapper } from './styles'

import { useTheme } from 'styled-components/native'

import { GoogleSignin } from '@react-native-google-signin/google-signin'

import AsyncStorage from '@react-native-async-storage/async-storage'

export function HomeHeader() {
  const user = auth().currentUser
  const { deleteAllExchanges } = useExchanges()

  const themes = useTheme()

  const { toggleTheme, theme } = useContext(ThemeContext)

  const isDarkTheme = theme === ThemeType.dark

  async function handleLogOut() {
    const user = auth().currentUser
    if (user) {
      const email = user.email || ''
      await AsyncStorage.removeItem(email)
      await auth().signOut()
      await GoogleSignin.signOut()
      deleteAllExchanges()
    }
  }

  return (
    <Container>
      <Wrapper>
        <Picture
          source={{ uri: user?.photoURL }}
          placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
        />

        <Greeting>
          <Message>Seja bem-vindo,</Message>

          <Name>{user?.displayName}</Name>
        </Greeting>

        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          thumbColor={themes.COLORS.GRAY_900}
          trackColor={{
            false: themes.COLORS.GRAY_300,
            true: themes.COLORS.GRAY_300,
          }}
          style={{ marginRight: 15 }}
        />

        <TouchableOpacity activeOpacity={0.7} onPress={handleLogOut}>
          <Icon
            name="arrow-forward-ios"
            size={22}
            color={themes.COLORS.GRAY_900}
          />
        </TouchableOpacity>
      </Wrapper>
    </Container>
  )
}
