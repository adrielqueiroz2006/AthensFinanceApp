import React, { useEffect } from 'react'
import { Text } from 'react-native'

import { Container } from './styles'

import auth from '@react-native-firebase/auth'

import { RouteProp, useRoute } from '@react-navigation/native'

type TypeStyleProps = 'GANHO' | 'GASTO'

type Category = {
  id: number
  name: string
  icon: string
}

type PaymentType = {
  id: number
  name: string
}

type ExchangeProps = {
  id: string
  details: string
  category: Category
  paymentType: PaymentType
  type: TypeStyleProps
  date: string
  price: string
}

type RootParamList = {
  statementDownload: { statement: ExchangeProps[] }
}

export function StatementDownload() {
  const user = auth().currentUser

  const route = useRoute<RouteProp<RootParamList, 'statementDownload'>>()
  const { statement } = route.params

  async function PDFCreate() {
    const content = `
        

    `
  }

  return (
    <Container>
      <Text>Hello World!</Text>
    </Container>
  )
}
