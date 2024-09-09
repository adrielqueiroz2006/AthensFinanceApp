import AsyncStorage from '@react-native-async-storage/async-storage'
import { EXCHANGE_COLLECTION } from '../storageConfig'
import { exchangeGetAll } from './exchangeGetAll'

export async function exchangeCreate(newExchange: object) {
  try {
    const storedExchanges = await exchangeGetAll()

    const storage = JSON.stringify([...storedExchanges, newExchange])

    await AsyncStorage.setItem(EXCHANGE_COLLECTION, storage)
  } catch (error) {
    throw error
  }
}
