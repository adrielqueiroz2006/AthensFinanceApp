import React from 'react'
import { Container, IconWrapper, Title, Value, Wrapper } from './styles'

import { useTheme } from 'styled-components/native'

import Icon from 'react-native-vector-icons/MaterialIcons'

export function FinancesCard() {
  const themes = useTheme()

  return (
    <Container>
      <Wrapper>
        <Title>Saldo Total</Title>
        <Value>R$ 1235,00</Value>
      </Wrapper>
      <IconWrapper>
        <Icon
          name="arrow-forward-ios"
          size={15}
          color={themes.COLORS.GRAY_900}
        />
      </IconWrapper>
    </Container>
  )
}
