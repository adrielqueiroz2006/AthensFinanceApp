import React, { useCallback, useRef } from 'react'
import { FlatList, View } from 'react-native'

import { useExchanges } from '../../contexts/ExchangeContext'

import { NewTransactionsCard } from '../../components/NewTransactionsCard'
import { EmptyExchanges } from '../../components/EmptyExchanges'

import { useFocusEffect } from '@react-navigation/native'

import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import { TransactionsCardActions } from '../../utils/TransactionsCardActions'

import { Wrapper } from './styles'

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
            <View style={{ paddingBottom: 15 }}>
              <Swipeable
                ref={cardActionsSwipeable}
                key={item.id}
                renderRightActions={() => (
                  <TransactionsCardActions exchange={item} />
                )}
                overshootRight={false}
              >
                <NewTransactionsCard
                  key={item.id}
                  details={item.details}
                  category={item.category.name}
                  paymentType={item.paymentType.name}
                  type={item.type}
                  icon={item.category.icon}
                  date={item.date}
                  value={item.price.toString().replace('.', ',')}
                />
              </Swipeable>
            </View>
          )}
        />
      ) : (
        <EmptyExchanges type="ganho" />
      )}
    </Wrapper>
  )
}
