import React, { useCallback, useRef, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'

import {
  CoinContainer,
  Container,
  Header,
  Picture,
  PriceText,
  Title,
} from './styles'

import { CurrencyCard } from '../../components/CurrencyCard'
import { CurrencyChart } from '../../components/CurrencyChart'

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet'

import auth from '@react-native-firebase/auth'

import { useExchanges } from '../../contexts/ExchangeContext'

import { useTheme } from 'styled-components/native'

import { useFocusEffect } from '@react-navigation/native'

export type CurrencyData = {
  high: string
  low: string
  varBid: string
  pctChange: string
  bid: string
  ask: string
  timestamp: string
}

export type CurrencyProps = {
  baseCurrency: string
}

export function Currency() {
  const user = auth().currentUser

  const [baseCurrency, setBaseCurrency] = useState('USD')

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = ['80%']

  const { exchanges, loadExchanges } = useExchanges()

  const themes = useTheme()

  function handleCloseAction() {
    bottomSheetRef.current?.close()
  }

  function handleOpenAction() {
    bottomSheetRef.current?.expand()
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    []
  )

  async function fetchExchanges() {
    try {
      loadExchanges()
    } catch (error) {
      console.log(error)
    }
  }

  const incomes = exchanges.filter((item) => item.type === 'GANHO')
  const totalIncomes = incomes.reduce(
    (total, item) => total + Number(item.price),
    0
  )

  const expenses = exchanges.filter((item) => item.type === 'GASTO')
  const totalExpenses = expenses.reduce(
    (total, item) => total + Number(item.price),
    0
  )

  const total = totalIncomes - totalExpenses

  useFocusEffect(
    useCallback(() => {
      fetchExchanges()
    }, [])
  )

  return (
    <Container>
      <ScrollView>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => (setBaseCurrency('USD'), handleOpenAction())}
        >
          <CurrencyCard baseCurrency="USD" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => (setBaseCurrency('EUR'), handleOpenAction())}
        >
          <CurrencyCard baseCurrency="EUR" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => (setBaseCurrency('GBP'), handleOpenAction())}
        >
          <CurrencyCard baseCurrency="GBP" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => (setBaseCurrency('JPY'), handleOpenAction())}
        >
          <CurrencyCard baseCurrency="JPY" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => (setBaseCurrency('BTC'), handleOpenAction())}
        >
          <CurrencyCard baseCurrency="BTC" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => (setBaseCurrency('ETH'), handleOpenAction())}
        >
          <CurrencyCard baseCurrency="ETH" />
        </TouchableOpacity>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: themes.COLORS.GRAY_100,
          borderRadius: 20,
        }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <CurrencyChart
            total={total}
            baseCurrency={baseCurrency}
            onCloseAction={handleCloseAction}
          />
        </BottomSheetView>
      </BottomSheet>
    </Container>
  )
}
