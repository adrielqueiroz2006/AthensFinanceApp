import React, { useCallback, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { useExchanges } from '../../contexts/ExchangeContext'

import { Container, Title } from './styles'

import { TransactionsCard } from '../TransactionsCard'

import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import { ExchangeCardActions } from '../../utils/ExchangeCardActions'

export function Transactions() {
  const { exchanges, loadExchanges } = useExchanges()
  const cardActionsSwipeable = useRef<any>(null)

  async function fetchExchanges() {
    try {
      loadExchanges()
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchExchanges()

      if (cardActionsSwipeable.current) {
        cardActionsSwipeable.current.close()
      }
    }, [])
  )

  return (
    <Container>
      <Title>Transações</Title>

      {exchanges.slice(0, 5).map((item) => (
        <Swipeable
          ref={cardActionsSwipeable}
          key={item.id}
          renderRightActions={() => <ExchangeCardActions exchange={item} />}
          overshootRight={false}
        >
          <TransactionsCard
            key={item.id}
            details={item.details}
            category={item.category.name}
            type={item.type}
            icon={item.category.icon}
            date={item.date}
            value={item.price.toString().replace('.', ',')}
          />
        </Swipeable>
      ))}
    </Container>
  )
}
