import AsyncStorage from '@react-native-async-storage/async-storage'
import { EXCHANGE_COLLECTION } from '../storageConfig'
import { exchangeGetAll } from './exchangeGetAll'

export async function exchangeDelete(exchangeId: string) {
  try {
    const storedExchanges = await exchangeGetAll()

    const filtered = storedExchanges.filter(
      (exchange) => exchange.id !== exchangeId
    )
    const storage = JSON.stringify(filtered)

    await AsyncStorage.setItem(EXCHANGE_COLLECTION, storage)
  } catch (error) {
    throw error
  }
}
