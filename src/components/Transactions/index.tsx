import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { Container, Title } from './styles'

import { TransactionsCard } from '../TransactionsCard'

import { ExchangeProps } from '../../screens/Home'

import { exchangeGetAll } from '../../storage/exchanges/exchangeGetAll'
import { exchangeDelete } from '../../storage/exchanges/exchangeDelete'

import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import { CardActions } from '../../utils/CardActions'

export function Transactions() {
  const [exchanges, setExchanges] = useState<ExchangeProps[]>([])

  async function fetchExchanges() {
    try {
      const data = await exchangeGetAll()
      setExchanges(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDeleteExchange(echangeId: string) {
    try {
      await exchangeDelete(echangeId)
    } catch (error) {
      console.log(error)
    }

    fetchExchanges()
  }

  useFocusEffect(
    useCallback(() => {
      fetchExchanges()
    }, [])
  )

  return (
    <Container>
      <Title>Transações</Title>

      {exchanges.slice(0, 5).map((item) => (
        <Swipeable
          key={item.id}
          renderRightActions={() => (
            <CardActions
              onDeleteExchange={() => handleDeleteExchange(item.id)}
            />
          )}
          overshootRight={false}
        >
          <TransactionsCard
            key={item.id}
            date={item.date}
            value={item.price.toString().replace('.', ',')}
            details={item.category.name}
            icon={item.category.icon}
            type={item.type}
          />
        </Swipeable>
      ))}
    </Container>
  )
}
