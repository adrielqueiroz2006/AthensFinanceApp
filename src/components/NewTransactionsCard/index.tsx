import React from 'react'
import {
  Container,
  DetailDate,
  DetailTitle,
  DetailsContainer,
  IconContainer,
  Price,
  PriceContainer,
  PriceType,
  PriceTypeContainer,
} from './styles'

import { useTheme } from 'styled-components'

import Icon from 'react-native-vector-icons/FontAwesome5'
import PaymentTypeIcon from 'react-native-vector-icons/FontAwesome6'

import { parse, differenceInCalendarDays } from 'date-fns'

type TypeStyleProps = 'GANHO' | 'GASTO'

type Props = {
  details: string
  category: string
  paymentType: string
  type: TypeStyleProps
  icon: string
  date: string
  value: string
}

export function NewTransactionsCard({
  date,
  value,
  paymentType,
  type,
  category,
  details,
  icon,
}: Props) {
  const themes = useTheme()

  function formatTypeIcon(type: string) {
    switch (type) {
      case 'Boleto':
        return 'file-invoice-dollar'
      case 'Pix':
        return 'pix'
      case 'Dinheiro':
        return 'money-bill-wave'
      default:
        return 'credit-card'
    }
  }

  function formatTypeColor(type: string) {
    switch (type) {
      case 'Boleto':
        return themes.COLORS.BLUE
      case 'Pix':
        return themes.COLORS.GREEN
      case 'Dinheiro':
        return themes.COLORS.GREEN
      default:
        return themes.COLORS.GRAY_900
    }
  }

  return (
    <Container>
      <IconContainer>
        <Icon name={icon} size={15} color="#fff" />
      </IconContainer>

      <DetailsContainer>
        <DetailTitle>
          {details.trim().length === 0
            ? category
            : details.charAt(0).toUpperCase() + details.slice(1)}
        </DetailTitle>
        <DetailDate>{date}</DetailDate>
      </DetailsContainer>

      <PriceContainer>
        <Price type={type}>
          {type === 'GANHO' ? '+' : '-'}R$ {value}
        </Price>
        <PriceTypeContainer>
          <PaymentTypeIcon
            name={formatTypeIcon(paymentType)}
            color={formatTypeColor(paymentType)}
          />
          <PriceType>{paymentType}</PriceType>
        </PriceTypeContainer>
      </PriceContainer>
    </Container>
  )
}
