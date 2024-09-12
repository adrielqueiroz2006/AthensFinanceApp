import React from 'react'
import { Container, IconContainer } from './styles'

import { useTheme } from 'styled-components/native'

import Icon from 'react-native-vector-icons/FontAwesome5'

type Props = {
  onDeleteExchange: () => void
}

export function CardActions({ onDeleteExchange }: Props) {
  const themes = useTheme()

  return (
    <Container>
      <IconContainer
        style={{ backgroundColor: themes.COLORS.RED, marginLeft: 10 }}
        onPress={onDeleteExchange}
      >
        <Icon name="trash" color={'white'} size={15} />
      </IconContainer>
    </Container>
  )
}
