import { useEffect, useState } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import Icon from 'react-native-vector-icons/Feather'
import IconAwesome from 'react-native-vector-icons/FontAwesome5'

import { useTheme } from 'styled-components/native'

import { SignIn } from '../screens/SignIn'
import { Home } from '../screens/Home'
import { Transactions } from '../screens/Transactions'
import { CreateTransaction } from '../screens/Transactions/CreateTransaction'
import { EditTransaction } from '../screens/Transactions/EditTransaction'
import { Payments } from '../screens/Payments'
import { Currency } from '../screens/Currency'

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { CreatePayment } from '../screens/Payments/CreatePayment'

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
      <Tab.Screen
        name="payments"
        component={Payments}
        options={{
          tabBarLabel: 'Contas',
          tabBarIcon: ({ color }) => (
            <IconAwesome name="credit-card" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="currency"
        component={Currency}
        options={{
          tabBarLabel: 'Cotação',
          tabBarIcon: ({ color }) => (
            <IconAwesome name="chart-line" color={color} size={23} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export function AppRoutes() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const [initializing, setInitializing] = useState(true)

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  if (initializing) return null

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Screen name="signIn" component={SignIn} />
      ) : (
        <>
          <Screen name="tabs" component={MyTabs} />

          <Screen name="createTransaction" component={CreateTransaction} />

          <Screen name="editTransaction" component={EditTransaction} />

          <Screen name="createPayment" component={CreatePayment} />
        </>
      )}
    </Navigator>
  )
}
