import React from 'react'
import { Container, IconWrapper, Title, Value, Wrapper } from './styles'

import Icon from 'react-native-vector-icons/MaterialIcons'
import theme from '../../theme'

export function FinancesCard() {
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
          color={theme.COLORS.GRAY_900}
        />
      </IconWrapper>
    </Container>
  )
}
