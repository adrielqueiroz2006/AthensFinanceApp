import React from 'react'

import { useExchanges } from '../../contexts/ExchangeContext'

import { Container, IconContainer } from './styles'

import { useTheme } from 'styled-components/native'

import { useNavigation } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/FontAwesome5'

type TypeStyleProps = 'GANHO' | 'GASTO'

type Category = {
  id: number
  name: string
  icon: string
}

type ExchangeProps = {
  id: string
  category: Category
  type: TypeStyleProps
  date: string
  price: string
}

type Props = {
  exchange: ExchangeProps
}

export function TransactionsCardActions({ exchange }: Props) {
  const { deleteExchange } = useExchanges()

  const themes = useTheme()

  const navigation = useNavigation()

  return (
    <Container>
      <IconContainer
        style={{ backgroundColor: themes.COLORS.BLUE, marginLeft: 10 }}
        onPress={() => navigation.navigate('editTransaction', { exchange })}
      >
        <Icon name="pen" color={'white'} size={15} />
      </IconContainer>

      <IconContainer
        style={{ backgroundColor: themes.COLORS.RED, marginLeft: 10 }}
        onPress={() => deleteExchange(exchange.id)}
      >
        <Icon name="trash" color={'white'} size={15} />
      </IconContainer>
    </Container>
  )
}
