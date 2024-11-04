import React, { useCallback, useRef } from 'react'
import { FlatList, View } from 'react-native'

import { Wrapper } from './styles'

import { useTheme } from 'styled-components'

import { usePayments } from '../../contexts/PaymentContext'

import { useFocusEffect } from '@react-navigation/native'

import { PaymentsCard } from '../../components/PaymentsCard'
import { EmptyPayments } from '../../components/EmptyPayments'

import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import { PaymentCardActions } from '../../utils/PaymentCardActions'

export function AllPayments() {
  const { payments, loadPayments } = usePayments()
  const cardActionsSwipeable = useRef<any>(null)

  const themes = useTheme()

  async function fetchPayments() {
    try {
      loadPayments()
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPayments()

      if (cardActionsSwipeable.current) {
        cardActionsSwipeable.current.close()
      }
    }, [])
  )

  return (
    <Wrapper>
      {payments.length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.id}
          data={payments}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ paddingBottom: 15 }}>
              <Swipeable
                ref={cardActionsSwipeable}
                key={item.id}
                renderRightActions={() => <PaymentCardActions payment={item} />}
                overshootRight={false}
              >
                <PaymentsCard
                  key={item.id}
                  details={item.details}
                  type={item.type.name}
                  category={item.category.name}
                  icon={item.category.icon}
                  date={item.date}
                  value={item.price.toString().replace('.', ',')}
                />
              </Swipeable>
            </View>
          )}
        />
      ) : (
        <EmptyPayments type="conta" text="Você não cadastrou nenhuma" />
      )}
    </Wrapper>
  )
}
