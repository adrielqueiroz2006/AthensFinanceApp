import React from 'react'
import { Container, IconWrapper, Title, Value, Wrapper } from './styles'

import { useTheme } from 'styled-components/native'

import Icon from 'react-native-vector-icons/MaterialIcons'

type financeCardProps = {
  income: number
  expense: number
}

export function FinancesCard({ income, expense }: financeCardProps) {
  const themes = useTheme()
  const total = Number(income) - Number(expense)

  return (
    <Container>
      <Wrapper>
        <Title>Saldo Total</Title>
        <Value>R$ {total}</Value>
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
