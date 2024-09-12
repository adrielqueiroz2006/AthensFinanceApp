import 'react-native-get-random-values'

// import { Container, Wrapper } from './styles'

import { HomeHeader } from '../../components/HomeHeader'
import { FinancesCard } from '../../components/FinancesCard'
import { Transactions } from '../../components/Transactions'
import { Statistics } from '../../components/Statistics'
import { Container } from '../../components/Container'
import { Wrapper } from '../../components/Wrapper'

import { Alert, ScrollView, StatusBar, Text } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { useQuery, useRealm } from '../../libs/realm'
import { UserDetails } from '../../libs/realm/schemas/UserDetails'
import { useTheme } from 'styled-components'
import { exchangeGetAll } from '../../storage/exchanges/exchangeGetAll'
import { useFocusEffect } from '@react-navigation/native'
import { EmptyTransactions } from '../../components/EmptyTransactions'

// import { PriceStyleProps } from '../../components/TransactionsCard/styles'

type TypeStyleProps = 'GANHO' | 'GASTO'

type Category = {
  id: number
  name: 'Compras'
  icon: 'shopping-cart'
}

export type ExchangeProps = {
  id: string
  category: Category
  type: TypeStyleProps
  date: string
  price: string
}

// export type ExchangeProps = {
//   date: string
//   value: string
//   details: string
//   icon: string
//   type: PriceStyleProps
// }

export function Home() {
  const themes = useTheme()

  // const realm = useRealm()

  // const userDetails = useQuery(UserDetails)

  // const [isLoaded, setIsLoaded] = useState(false)

  // const [nome, setNome] = useState('')
  // const [email, setEmail] = useState('')
  // const [senha, setSenha] = useState('')

  // function onCadastrar() {
  //   try {
  //     setIsLoaded(true)

  //     realm.write(() => {
  //       realm.create(
  //         'UserDetails',
  //         UserDetails.generate({
  //           name: 'Adriel',
  //           email: 'adriel@gmail.com',
  //           password: 'senha123',
  //         })
  //       )
  //     })

  //     // realm.write(() => {
  //     //   realm.deleteAll()
  //     // })

  //     setIsLoaded(false)

  //     Alert.alert('Cadastrado com sucesso')
  //   } catch (err) {
  //     setIsLoaded(false)
  //     console.log(err)
  //     Alert.alert('Não foi possivel cadastrar')
  //   }
  // }

  // function fetchUser() {
  //   setNome(userDetails[0].name)
  //   setEmail(userDetails[0].email)
  //   setSenha(userDetails[0].password)
  // }

  // useEffect(() => {
  //   fetchUser()
  // }, [])

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
      <Wrapper>
        <ScrollView>
          <FinancesCard income={totalIncomes} expense={totalExpenses} />

          {exchanges.length > 0 ? (
            <>
              <Transactions />

              <Statistics income={totalIncomes} expense={totalExpenses} />
            </>
          ) : (
            <EmptyTransactions />
          )}
        </ScrollView>
      </Wrapper>

      {/* <Button title="Cadastrar" isLoading={isLoaded} onPress={onCadastrar} />
      <Text>{nome}</Text>
      <Text>{email}</Text>
      <Text>{senha}</Text> */}
    </Container>
  )
}
