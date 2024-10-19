import React, { useCallback, useRef } from 'react'
import { FlatList } from 'react-native'

import { useExchanges } from '../../contexts/ExchangeContext'

import { Wrapper } from '../../components/Wrapper'
import { TransactionsCard } from '../../components/TransactionsCard'
import { EmptyExchanges } from '../../components/EmptyExchanges'

import { useFocusEffect } from '@react-navigation/native'

import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import { CardActions } from '../../utils/CardActions'

export function Ganhos() {
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
    <Wrapper>
      {exchanges.filter((item) => item.type === 'GANHO').length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.id}
          data={exchanges.filter((item) => item.type === 'GANHO')}
          renderItem={({ item }) => (
            <Swipeable
              ref={cardActionsSwipeable}
              key={item.id}
              renderRightActions={() => <CardActions exchange={item} />}
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
        <EmptyExchanges type="ganho" />
      )}
    </Wrapper>
  )
}
