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
  const total = income - expense

  return (
    <Container>
      <Wrapper>
        <Title>Saldo Total</Title>
        <Value>
          {Number(total) >= 0
            ? `R$ ${total.toFixed(2).replace('.', ',')}`
            : `-R$ ${Number(-total).toFixed(2).replace('.', ',')}`}
        </Value>
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
