import React from 'react'
import {
  Container,
  DetailDate,
  DetailTitle,
  DetailsContainer,
  IconContainer,
  Price,
  PriceStyleProps,
} from './styles'

import Icon from 'react-native-vector-icons/FontAwesome5'
import theme from '../../theme'

type Props = {
  date: string
  value: string
  details: string
  icon: string
  type?: PriceStyleProps
}

export function TransactionsCard({
  date,
  value,
  details,
  icon = 'shopping-cart',
  type = 'GANHO',
}: Props) {
  return (
    <Container>
      <IconContainer>
        <Icon name={icon} size={15} color={theme.COLORS.WHITE} />
      </IconContainer>

      <DetailsContainer>
        <DetailTitle>{details}</DetailTitle>
        <DetailDate>{date}</DetailDate>
      </DetailsContainer>

      <Price type={type}>
        {type === 'GANHO' ? '+' : '-'}R$ {value}
      </Price>
    </Container>
  )
}
