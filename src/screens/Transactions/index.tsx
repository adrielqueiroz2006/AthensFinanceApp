import React from 'react'

import { Container } from '../../components/Container'
import { Header } from '../../components/Header'

import { Button, TabWrapper, Title } from './styles'

import Icon from 'react-native-vector-icons/FontAwesome5'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import themes from '../../theme/light'

import { Ganhos } from './ganhos'
import { Gastos } from './gastos'

const Tab = createMaterialTopTabNavigator()

function TabTop() {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarActiveTintColor: themes.COLORS.BRAND_DARK,
        tabBarLabelStyle: { color: themes.COLORS.GRAY_900 },

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
        name="Ganhos"
        options={{ tabBarLabel: 'Ganhos' }}
        component={Ganhos}
      />
      <Tab.Screen
        name="Gastos"
        options={{ tabBarLabel: 'Gastos' }}
        component={Gastos}
      />
    </Tab.Navigator>
  )
}

export function Transactions() {
  return (
    <Container>
      <Header>
        <Title>Transações</Title>
        <Button>
          <Icon name="plus" color={themes.COLORS.WHITE} size={15} />
        </Button>
      </Header>

      <TabWrapper>
        <TabTop />
      </TabWrapper>
    </Container>
  )
}
