import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/Home'
import { Transactions } from '../screens/Transactions'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {/* <Screen name="home" component={Home} /> */}
      <Screen name="transaction" component={Transactions} />
    </Navigator>
  )
}
