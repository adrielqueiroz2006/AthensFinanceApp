import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useUser, useApp } from '@realm/react'

import { Container, Greeting, Message, Name, Picture, Wrapper } from './styles'

import theme from '../../theme'

export function HomeHeader() {
  const user = useUser()
  const app = useApp()

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

        <TouchableOpacity activeOpacity={0.7} onPress={handleLogOut}>
          <Icon
            name="arrow-forward-ios"
            size={22}
            color={theme.COLORS.GRAY_900}
          />
        </TouchableOpacity>
      </Wrapper>
    </Container>
  )
}
