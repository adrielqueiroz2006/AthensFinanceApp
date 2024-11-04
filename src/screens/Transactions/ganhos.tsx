import React, { useCallback, useRef } from 'react'
import { FlatList } from 'react-native'

import { useExchanges } from '../../contexts/ExchangeContext'

import { Wrapper } from '../../components/Wrapper'
import { TransactionsCard } from '../../components/TransactionsCard'
import { EmptyExchanges } from '../../components/EmptyExchanges'

import { useFocusEffect } from '@react-navigation/native'

import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import { ExchangeCardActions } from '../../utils/ExchangeCardActions'

export function Ganhos() {
  const { exchanges, loadExchanges } = useExchanges()
  const cardActionsSwipeable = useRef<any>(null)

  async function fetchExchanges() {
    try {
      await loadExchanges()
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
    <Wrapper>
      {exchanges.filter((item) => item.type === 'GANHO').length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.id}
          data={exchanges.filter((item) => item.type === 'GANHO')}
          renderItem={({ item }) => (
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
          )}
        />
      ) : (
        <EmptyExchanges type="ganho" />
      )}
    </Wrapper>
  )
}
