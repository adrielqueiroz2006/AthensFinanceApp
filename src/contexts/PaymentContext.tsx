import React, { createContext, useState, useContext } from 'react'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { parse } from 'date-fns'

type PaymentType = {
  id: number
  name: string
}

type Category = {
  id: number
  name: string
  icon: string
}

type PaymentProps = {
  id: string
  details: string
  type: PaymentType
  category: Category
  date: string
  price: string
}

type PaymentContextType = {
  payments: PaymentProps[]
  setPayments: React.Dispatch<React.SetStateAction<PaymentProps[]>>
  addPayment: (newPayment: PaymentProps) => Promise<void>
  loadPayments: () => Promise<void>
  deleteAllPayments: () => void
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export function usePayments() {
  const context = useContext(PaymentContext)
  if (!context) {
    throw new Error('usePayments deve ser usado apenas com um PaymentProvider')
  }
  return context
}

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [payments, setPayments] = useState<PaymentProps[]>([])

  function orderByDate(payments: PaymentProps[]) {
    return payments.sort((a, b) => {
      const dateA = parse(a.date, 'dd/MM/yy', new Date())
      const dateB = parse(b.date, 'dd/MM/yy', new Date())

      return dateB.getTime() - dateA.getTime()
    })
  }

  async function loadPayments() {
    const email = auth().currentUser?.email
    if (email) {
      const storedPayments = await AsyncStorage.getItem(`${email}@payments`)
      if (storedPayments) {
        setPayments(JSON.parse(storedPayments))
      } else {
        const userPayments = await firestore()
          .collection('users')
          .doc(email)
          .get()
        if (userPayments.exists) {
          const fetchedPayments = userPayments.data()?.payments || []
          setPayments(fetchedPayments)
          await AsyncStorage.setItem(
            `${email}@payments`,
            JSON.stringify(fetchedPayments)
          )
        }
      }
    }
  }

  async function addPayment(newPayment: PaymentProps) {
    const email = auth().currentUser?.email
    if (email) {
      const updatedPayments = orderByDate([...payments, newPayment])
      setPayments(updatedPayments)

      await firestore()
        .collection('users')
        .doc(email)
        .set({ payments: updatedPayments }, { merge: true })

      await AsyncStorage.setItem(
        `${email}@payments`,
        JSON.stringify(updatedPayments)
      )
    }
  }

  async function deleteAllPayments() {
    const email = auth().currentUser?.email
    if (email) {
      setPayments([])
      await firestore()
        .collection('users')
        .doc(email)
        .set({ payments: [] }, { merge: true })
      await AsyncStorage.setItem(`${email}@payments`, JSON.stringify([]))
    }
  }

  return (
    <PaymentContext.Provider
      value={{
        payments,
        addPayment,
        loadPayments,
        setPayments,
        deleteAllPayments,
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}
