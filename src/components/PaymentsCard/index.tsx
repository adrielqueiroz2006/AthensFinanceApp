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

import { format, parse, differenceInCalendarDays } from 'date-fns'

type Props = {
  date: string
  value: string
  type: string
  category: string
  details: string
  icon: string
}

export function PaymentsCard({
  date,
  value,
  type,
  category,
  details,
  icon,
}: Props) {
  const themes = useTheme()

  function formatDateText(dateString: string) {
    const currentDate = new Date()
    const compareDate = parse(dateString, 'dd/MM/yy', new Date())
    const differenceDays = differenceInCalendarDays(compareDate, currentDate)

    if (differenceDays === 0) {
      return 'Vence Hoje'
    } else if (differenceDays === -1) {
      return 'Venceu Ontem'
    } else if (differenceDays < -1) {
      return `Venceu há ${Math.abs(differenceDays)} dias atrás`
    } else if (differenceDays === 1) {
      return 'Vence amanhã'
    } else {
      return `Vence ${dateString}`
    }
  }

  function formatDateTextColor(dateString: string) {
    const currentDate = new Date()
    const compareDate = parse(dateString, 'dd/MM/yy', new Date())
    const differenceDays = differenceInCalendarDays(compareDate, currentDate)

    let color: string

    if (differenceDays < 0) {
      return themes.COLORS.RED
    } else {
      return themes.COLORS.GRAY_900
    }
  }

  const formattedColor = formatDateTextColor(date)

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
        <DetailDate style={{ color: formattedColor }}>
          {formatDateText(date)}
        </DetailDate>
      </DetailsContainer>

      <PriceContainer>
        <Price>R$ {value}</Price>
        <PriceTypeContainer>
          <Icon name="circle" solid color={themes.COLORS.GREEN} />
          <PriceType>{type}</PriceType>
        </PriceTypeContainer>
      </PriceContainer>
    </Container>
  )
}
