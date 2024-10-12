import { ScrollView, StatusBar } from 'react-native'
import { useCallback } from 'react'

import { useExchanges } from '../../contexts/ExchangeContext'

import 'react-native-get-random-values'

import { HomeHeader } from '../../components/HomeHeader'
import { FinancesCard } from '../../components/FinancesCard'
import { EmptyTransactions } from '../../components/EmptyTransactions'
import { Transactions } from '../../components/Transactions'
import { Statistics } from '../../components/Statistics'
import { Container } from '../../components/Container'
import { Wrapper } from '../../components/Wrapper'

import { useTheme } from 'styled-components'
import { useFocusEffect } from '@react-navigation/native'

export function Home() {
  const themes = useTheme()

  const { exchanges, loadExchanges } = useExchanges()

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
    </Container>
  )
}
