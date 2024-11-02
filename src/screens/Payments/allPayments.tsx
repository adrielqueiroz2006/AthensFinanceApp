import React, { useCallback } from 'react'
import { FlatList } from 'react-native'

import { Wrapper } from './styles'

import { useTheme } from 'styled-components'

import { usePayments } from '../../contexts/PaymentContext'

import { useFocusEffect } from '@react-navigation/native'

import { PaymentsCard } from '../../components/PaymentsCard'

export function AllPayments() {
  const { payments, loadPayments } = usePayments()

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
    }, [])
  )

  return (
    <Wrapper>
      <FlatList
        keyExtractor={(item) => item.id}
        data={payments}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PaymentsCard
            key={item.id}
            details={item.details}
            type={item.type.name}
            category={item.category.name}
            icon={item.category.icon}
            date={item.date}
            value={item.price.toString().replace('.', ',')}
          />
        )}
      />
    </Wrapper>
  )
}
