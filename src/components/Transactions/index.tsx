import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { Container, Title } from './styles'

import { TransactionsCard } from '../TransactionsCard'

import { ExchangeProps } from '../../screens/Home'

import { exchangeGetAll } from '../../storage/exchanges/exchangeGetAll'

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

  useFocusEffect(
    useCallback(() => {
      fetchExchanges()
    }, [])
  )

  return (
    <Container>
      {exchanges.length > 0 ? (
        <>
          <Title>Transações</Title>

          {exchanges.slice(0, 5).map((item) => (
            <TransactionsCard
              key={item.id}
              date={item.date}
              value={item.price}
              details={item.category}
              icon={
                item.category === 'Compras' ? 'shopping-cart' : 'dollar-sign'
              }
              type={item.type}
            />
          ))}
        </>
      ) : (
        <></>
      )}
    </Container>
  )
}
