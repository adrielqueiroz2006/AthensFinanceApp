import { ScrollView, StatusBar, View } from 'react-native'
import { useCallback } from 'react'

import { useExchanges } from '../../contexts/ExchangeContext'

import 'react-native-get-random-values'

import * as Notifications from 'expo-notifications'

import { HomeHeader } from '../../components/HomeHeader'
import { FinancesCard } from '../../components/FinancesCard'
import { Wrapper } from '../../components/TransactionsCard/Wrapper'
import { EmptyTransactions } from '../../components/EmptyTransactions'
import { Transactions } from '../../components/Transactions'
import { Statistics } from '../../components/Statistics'
import { Container } from '../../components/Container'

import { useTheme } from 'styled-components'
import { useFocusEffect } from '@react-navigation/native'
import { usePayments } from '../../contexts/PaymentContext'

export function Home() {
  const themes = useTheme()

  const { exchanges, loadExchanges } = useExchanges()
  const { loadPayments, setNotifications } = usePayments()

  async function fetchData() {
    try {
      loadExchanges()
      loadPayments()
    } catch (error) {
      console.log(error)
    }
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  })

  async function requestNotificationPermission() {
    const { status } = await Notifications.getPermissionsAsync()
    if (status !== 'granted') {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync()
      if (newStatus !== 'granted') {
        return false
      }
    }
    return true
  }

  async function checkNotificationPermission() {
    const notificationPermission = await requestNotificationPermission()
    setNotifications(notificationPermission)

    return
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
      checkNotificationPermission()
    }, [])
  )

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

  return (
    <Container>
      <StatusBar
        barStyle={
          themes.COLORS.BACKGROUND === '#080808'
            ? 'light-content'
            : 'dark-content'
        }
        backgroundColor="transparent"
        translucent
      />
      <HomeHeader />
      <View style={{ flex: 1, backgroundColor: themes.COLORS.GRAY_100 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Wrapper>
            <FinancesCard income={totalIncomes} expense={totalExpenses} />

            {exchanges.length > 0 ? (
              <>
                <Transactions />

                <Statistics income={totalIncomes} expense={totalExpenses} />
              </>
            ) : (
              <EmptyTransactions />
            )}
          </Wrapper>
        </ScrollView>
      </View>
    </Container>
  )
}
