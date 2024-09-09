import React, { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import { Wrapper } from '../../components/Wrapper'
import { TransactionsCard } from '../../components/TransactionsCard'
import { EmptyExchanges } from '../../components/EmptyExchanges'

import { ExchangeProps } from './CreateTransaction'
import { exchangeGetAll } from '../../storage/exchanges/exchangeGetAll'

import { useFocusEffect } from '@react-navigation/native'

export function Gastos() {
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
    <Wrapper>
      {exchanges.length > 0 ? (
        <FlatList
          data={exchanges.filter((item) => item.type === 'GASTO')}
          renderItem={({ item }) => (
            <TransactionsCard
              key={item.id}
              date={item.date}
              value={item.price}
              details={item.category}
              icon={'shopping-cart'}
              type={item.type}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <EmptyExchanges type="gasto" />
      )}

      {/* <FlatList
        data={transactionsData.filter((item) => item.type === 'GASTO')}
        renderItem={({ item }) => (
          <TransactionsCard
            key={item.value}
            date={item.date}
            value={item.value}
            details={item.details}
            icon={item.icon}
            type={item.type}
          />
        )}
        keyExtractor={(item) => item.value}
      /> */}
    </Wrapper>
  )
}
