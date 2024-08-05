import { Switch, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useUser, useApp } from '@realm/react'

import { ThemeContext, ThemeType } from '../../theme/Theme'

import { Container, Greeting, Message, Name, Picture, Wrapper } from './styles'
import { useTheme } from 'styled-components/native'
import { useContext } from 'react'

export function HomeHeader() {
  const user = useUser()
  const app = useApp()

  const themes = useTheme()

  const { toggleTheme, theme } = useContext(ThemeContext)

  const isDarkTheme = theme === ThemeType.dark

  function handleLogOut() {
    app.currentUser?.logOut()
  }

  return (
    <Container>
      <Wrapper>
        <Picture
          source={{ uri: user?.profile.pictureUrl }}
          placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
        />

        <Greeting>
          <Message>Seja bem-vindo,</Message>

          <Name>{user?.profile.name}</Name>
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
