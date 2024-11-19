import React from 'react'
import {
  ColumnLeft,
  ColumnRight,
  Container,
  ExchangeCategory,
  ExchangeContainer,
  ExchangeDetails,
  ExchangePrice,
  ExchangeType,
  IconContainer,
  Spacer,
} from './styles'

import Icon from 'react-native-vector-icons/FontAwesome5'

import { useTheme } from 'styled-components'

type TypeStyleProps = 'GANHO' | 'GASTO'

type PaymentType = {
  id: number
  name: string
}

type Props = {
  category: string
  details: string
  paymentType: string
  type: TypeStyleProps
  icon: string
  date: string
  price: string
}

export function StatementCard({
  category,
  details,
  paymentType,
  type,
  icon,
  date,
  price,
}: Props) {
  const themes = useTheme()

  return (
    <Container>
      <ColumnLeft>
        <IconContainer>
          <Icon name={icon} size={22} color={themes.COLORS.BRAND_MID} />
        </IconContainer>

        <Spacer />

        <ExchangeContainer>
          <ExchangeType>
            Compra no{' '}
            {paymentType === 'Cartão de Crédito'
              ? 'Crédito'
              : paymentType === 'Cartão de Débito'
              ? 'Débito'
              : paymentType}
          </ExchangeType>
          <ExchangePrice>
            {type === 'GANHO' ? '+' : '-'}R$ {price}
          </ExchangePrice>

          {details.trim() !== '' && (
            <ExchangeDetails>{details}</ExchangeDetails>
          )}
          <ExchangeCategory>{category}</ExchangeCategory>
        </ExchangeContainer>
      </ColumnLeft>
    </Container>
  )
}
