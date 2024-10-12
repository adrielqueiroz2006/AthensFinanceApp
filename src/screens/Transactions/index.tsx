import React, { useState } from 'react'

import { Container } from '../../components/Container'

import { Button, Header, TabWrapper, Title } from './styles'

import Icon from 'react-native-vector-icons/FontAwesome5'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { Ganhos } from './ganhos'
import { Gastos } from './gastos'

import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'

type TypeStyleProps = 'GANHO' | 'GASTO'

const Tab = createMaterialTopTabNavigator()

function TabTop({
  setCurrentTab,
}: {
  setCurrentTab: (tab: TypeStyleProps) => void
}) {
  const themes = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarActiveTintColor: themes.COLORS.BRAND_DARK,
        tabBarLabelStyle: {
          fontSize: themes.FONT_SIZE.XS,
          color: themes.COLORS.GRAY_900,
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
      screenListeners={{
        state: (e) => {
          const index = e.data.state.index
          const currentTab = index === 0 ? 'GANHO' : 'GASTO'
          setCurrentTab(currentTab)
        },
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
  const navigation = useNavigation()
  const themes = useTheme()
  const [currentTab, setCurrentTab] = useState<TypeStyleProps>('GANHO')

  return (
    <Container>
      <Header>
        <Title>Transações</Title>
        <Button
          onPress={() =>
            navigation.navigate('createTransaction', { currentTab })
          }
        >
          <Icon name="plus" color={themes.COLORS.BACKGROUND} size={15} />
        </Button>
      </Header>

      <TabWrapper>
        <TabTop setCurrentTab={setCurrentTab} />
      </TabWrapper>
    </Container>
  )
}
