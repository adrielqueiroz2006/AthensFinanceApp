import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import Icon from 'react-native-vector-icons/Feather'

import { useTheme } from 'styled-components/native'

import { Home } from '../screens/Home'
import { Transactions } from '../screens/Transactions'
import { CreateTransaction } from '../screens/Transactions/CreateTransaction'

const { Navigator, Screen } = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator()

function MyTabs() {
  const themes = useTheme()

  return (
    <Tab.Navigator
      initialRouteName="home"
      activeColor={themes.COLORS.GRAY_900}
      inactiveColor={themes.COLORS.GRAY_500}
      activeIndicatorStyle={{ backgroundColor: 'transparent' }}
      barStyle={{
        backgroundColor: themes.COLORS.BACKGROUND,
        borderTopWidth: 0.2,
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="transaction"
        component={Transactions}
        options={{
          tabBarLabel: 'Transações',
          tabBarIcon: ({ color }) => (
            <Icon name="repeat" color={color} size={23} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="tabs" component={MyTabs} />

      <Screen name="createTransaction" component={CreateTransaction} />
    </Navigator>
  )
}
