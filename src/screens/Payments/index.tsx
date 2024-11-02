import React, { useCallback } from 'react'

import { Container } from '../../components/Container'

import { Button, Header, TabWrapper, Title } from './styles'

import { usePayments } from '../../contexts/PaymentContext'

import Icon from 'react-native-vector-icons/FontAwesome5'

import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { useTheme } from 'styled-components'

import { PaymentsCard } from '../../components/PaymentsCard'

import { FlatList } from 'react-native-gesture-handler'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { AllPayments } from './allPayments'
import { UpcomingPayments } from './upcomingPayments'
import { ExpiredPayments } from './expiredPayments'

const Tab = createMaterialTopTabNavigator()

function TabTop() {
  const themes = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarActiveTintColor: themes.COLORS.BRAND_DARK,
        tabBarLabelStyle: {
          fontSize: themes.FONT_SIZE.SM,
          color: themes.COLORS.GRAY_900,
          textTransform: 'none',
        },
        tabBarStyle: {
          backgroundColor: themes.COLORS.GRAY_100,
        },
        tabBarIndicatorStyle: {
          backgroundColor: themes.COLORS.BRAND_DARK,
        },
        swipeEnabled: false,
        animationEnabled: true,
      }}
    >
      <Tab.Screen
        name="Todos"
        options={{ tabBarLabel: 'Todos' }}
        component={AllPayments}
      />
      <Tab.Screen
        name="Chegando"
        options={{ tabBarLabel: 'Chegando' }}
        component={UpcomingPayments}
      />
      <Tab.Screen
        name="Vencidos"
        options={{ tabBarLabel: 'Vencidos' }}
        component={ExpiredPayments}
      />
    </Tab.Navigator>
  )
}

export function Payments() {
  const { loadPayments } = usePayments()

  const navigation = useNavigation()
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
    <Container>
      <Header>
        <Title>Contas</Title>
        <Button onPress={() => navigation.navigate('createPayment')}>
          <Icon name="plus" color={themes.COLORS.BACKGROUND} size={15} />
        </Button>
      </Header>

      <TabWrapper>
        <TabTop />
      </TabWrapper>
    </Container>
  )
}
