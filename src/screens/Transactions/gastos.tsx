import React, { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import { Wrapper } from '../../components/Wrapper'
import { TransactionsCard } from '../../components/TransactionsCard'
import { EmptyExchanges } from '../../components/EmptyExchanges'

import { ExchangeProps } from './CreateTransaction'
import { exchangeGetAll } from '../../storage/exchanges/exchangeGetAll'
import { exchangeDelete } from '../../storage/exchanges/exchangeDelete'

import { useFocusEffect } from '@react-navigation/native'

import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import { CardActions } from '../../utils/CardActions'

export function Gastos() {
  const [exchanges, setExchanges] = useState<ExchangeProps[]>([])

  async function fetchExchanges() {
    try {
      const data = await exchangeGetAll()
      setExchanges(data.filter((item) => item.type === 'GASTO'))
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
    <Wrapper>
      {exchanges.length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.id}
          data={exchanges}
          renderItem={({ item }) => (
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
          )}
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
