import React from 'react'

import { usePayments } from '../../contexts/PaymentContext'

import { Container, IconContainer } from './styles'

import { useTheme } from 'styled-components/native'

import { useNavigation } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/FontAwesome5'

type PaymentType = {
  id: number
  name: string
}

type Category = {
  id: number
  name: string
  icon: string
}

type PaymentProps = {
  id: string
  details: string
  type: PaymentType
  category: Category
  date: string
  price: string
}

type Props = {
  payment: PaymentProps
}

export function PaymentCardActions({ payment }: Props) {
  const { deletePayment } = usePayments()
  const { payPayment } = usePayments()

  const themes = useTheme()

  const navigation = useNavigation()

  return (
    <Container>
      <IconContainer
        style={{ backgroundColor: themes.COLORS.BLUE, marginLeft: 10 }}
        onPress={() => navigation.navigate('editPayment', { payment })}
      >
        <Icon name="pen" color={'white'} size={15} />
      </IconContainer>

      <IconContainer
        style={{ backgroundColor: themes.COLORS.GREEN, marginLeft: 10 }}
        onPress={() => payPayment(payment)}
      >
        <Icon name="check" color={'white'} size={15} />
      </IconContainer>

      <IconContainer
        style={{ backgroundColor: themes.COLORS.RED, marginLeft: 10 }}
        onPress={() => deletePayment(payment.id)}
      >
        <Icon name="trash" color={'white'} size={15} />
      </IconContainer>
    </Container>
  )
}
