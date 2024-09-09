import AsyncStorage from '@react-native-async-storage/async-storage'
import { EXCHANGE_COLLECTION } from '../storageConfig'
import { ExchangeProps } from '../../screens/Home'

export async function exchangeGetAll() {
  try {
    const storage = await AsyncStorage.getItem(EXCHANGE_COLLECTION)

    const exchange: ExchangeProps[] = storage ? JSON.parse(storage) : []

    // await AsyncStorage.removeItem(EXCHANGE_COLLECTION)

    return exchange
  } catch (error) {
    throw error
  }
}
