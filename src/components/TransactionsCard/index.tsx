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

type Props = {
  details: string
  category: string
  type: PriceStyleProps
  icon: string
  date: string
  value: string
}

export function TransactionsCard({
  details,
  category,
  type,
  icon,
  date,
  value,
}: Props) {
  return (
    <Container>
      <IconContainer>
        <Icon name={icon} size={15} color="#fff" />
      </IconContainer>

      <DetailsContainer>
        <DetailTitle>{category}</DetailTitle>
        <DetailDate>{date}</DetailDate>
      </DetailsContainer>

      <Price type={type}>
        {type === 'GANHO' ? '+' : '-'}R$ {value}
      </Price>
    </Container>
  )
}
