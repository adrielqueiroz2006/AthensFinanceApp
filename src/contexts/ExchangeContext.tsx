import React, { createContext, useState, useContext } from 'react'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { parse } from 'date-fns'

type Category = {
  id: number
  name: string
  icon: string
}

type PaymentType = {
  id: number
  name: string
}

type TypeStyleProps = 'GANHO' | 'GASTO'

type ExchangeProps = {
  id: string
  details: string
  category: Category
  paymentType: PaymentType
  type: TypeStyleProps
  date: string
  price: string
}

type ExchangeContextType = {
  exchanges: ExchangeProps[]
  setExchanges: React.Dispatch<React.SetStateAction<ExchangeProps[]>>
  iniDate: string
  setIniDate: React.Dispatch<React.SetStateAction<string>>
  finDate: string
  setFinDate: React.Dispatch<React.SetStateAction<string>>
  addExchange: (newExchange: ExchangeProps) => Promise<void>
  loadExchanges: () => Promise<void>
  deleteExchange: (exchangeId: string) => Promise<void>
  editExchange: (updatedExchanges: ExchangeProps) => Promise<void>
  deleteAllExchanges: () => void
}

const ExchangeContext = createContext<ExchangeContextType | undefined>(
  undefined
)

export function useExchanges() {
  const context = useContext(ExchangeContext)
  if (!context) {
    throw new Error(
      'useExchanges deve ser usado apenas com um ExchangeProvider'
    )
  }
  return context
}

export const ExchangeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [exchanges, setExchanges] = useState<ExchangeProps[]>([])
  const [iniDate, setIniDate] = useState('')
  const [finDate, setFinDate] = useState('')

  function orderByDate(exchanges: ExchangeProps[]) {
    return exchanges.sort((a, b) => {
      const dateA = parse(a.date, 'dd/MM/yy', new Date())
      const dateB = parse(b.date, 'dd/MM/yy', new Date())

      return dateB.getTime() - dateA.getTime()
    })
  }

  async function loadExchanges() {
    const email = auth().currentUser?.email
    if (email) {
      const storedExchanges = await AsyncStorage.getItem(`${email}@exchanges`)
      if (storedExchanges) {
        setExchanges(JSON.parse(storedExchanges))
      } else {
        const userExchanges = await firestore()
          .collection('users')
          .doc(email)
          .get()
        if (userExchanges.exists) {
          const fetchedExchanges = userExchanges.data()?.exchanges || []
          setExchanges(fetchedExchanges)
          await AsyncStorage.setItem(
            `${email}@exchanges`,
            JSON.stringify(fetchedExchanges)
          )
        }
      }
    }
  }

  async function addExchange(newExchange: ExchangeProps) {
    const email = auth().currentUser?.email
    if (email) {
      const updatedExchanges = orderByDate([...exchanges, newExchange])
      setExchanges(updatedExchanges)

      await firestore()
        .collection('users')
        .doc(email)
        .set({ exchanges: updatedExchanges }, { merge: true })

      await AsyncStorage.setItem(
        `${email}@exchanges`,
        JSON.stringify(updatedExchanges)
      )
    }
  }

  async function deleteAllExchanges() {
    const email = auth().currentUser?.email
    if (email) {
      setExchanges([])
      await firestore()
        .collection('users')
        .doc(email)
        .set({ exchanges: [] }, { merge: true })
      await AsyncStorage.setItem(`${email}@exchanges`, JSON.stringify([]))
    }
  }

  async function deleteExchange(exchangeId: string) {
    const email = auth().currentUser?.email
    if (email) {
      const updatedExchanges = exchanges.filter(
        (exchange) => exchange.id !== exchangeId
      )
      setExchanges(updatedExchanges)
      await firestore()
        .collection('users')
        .doc(email)
        .set({ exchanges: updatedExchanges }, { merge: true })
      await AsyncStorage.setItem(
        `${email}@exchanges`,
        JSON.stringify(updatedExchanges)
      )
    }
  }

  async function editExchange(updatedExchange: ExchangeProps) {
    const email = auth().currentUser?.email
    if (email) {
      const updatedExchanges = exchanges.map((exchange) =>
        exchange.id === updatedExchange.id ? updatedExchange : exchange
      )
      setExchanges(updatedExchanges)
      await firestore()
        .collection('users')
        .doc(email)
        .set({ exchanges: updatedExchanges }, { merge: true })
      await AsyncStorage.setItem(
        `${email}@exchanges`,
        JSON.stringify(updatedExchanges)
      )
    }
  }

  return (
    <ExchangeContext.Provider
      value={{
        exchanges,
        iniDate,
        setIniDate,
        finDate,
        setFinDate,
        addExchange,
        loadExchanges,
        setExchanges,
        deleteExchange,
        deleteAllExchanges,
        editExchange,
      }}
    >
      {children}
    </ExchangeContext.Provider>
  )
}
