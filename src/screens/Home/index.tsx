import 'react-native-get-random-values'

import { Container, Wrapper } from './styles'

import { HomeHeader } from '../../components/HomeHeader'
import { Button } from '../../components/Button'
import { FinancesCard } from '../../components/FinancesCard'
import { Transactions } from '../../components/Transactions'
import { Statistics } from '../../components/Statistics'

import { Alert, ScrollView, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { useQuery, useRealm } from '../../libs/realm'
import { UserDetails } from '../../libs/realm/schemas/UserDetails'

export function Home() {
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

  return (
    <Container>
      <HomeHeader />

      <ScrollView>
        <Wrapper>
          <FinancesCard />

          <Transactions />

          <Statistics />
        </Wrapper>
      </ScrollView>

      {/* <Button title="Cadastrar" isLoading={isLoaded} onPress={onCadastrar} />
      <Text>{nome}</Text>
      <Text>{email}</Text>
      <Text>{senha}</Text> */}
    </Container>
  )
}
