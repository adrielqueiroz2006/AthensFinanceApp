import React, { createContext, useState, useContext } from 'react'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { parse } from 'date-fns'
import { useExchanges } from './ExchangeContext'

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

type TypeStyleProps = 'GANHO' | 'GASTO'

type ExchangeProps = {
  id: string
  details: string
  category: Category
  type: TypeStyleProps
  date: string
  price: string
}

type PaymentContextType = {
  payments: PaymentProps[]
  setPayments: React.Dispatch<React.SetStateAction<PaymentProps[]>>
  addPayment: (newPayment: PaymentProps) => Promise<void>
  loadPayments: () => Promise<void>
  deletePayment: (paymentId: string) => Promise<void>
  editPayment: (updatedPayments: PaymentProps) => Promise<void>
  deleteAllPayments: () => void
  payPayment: (paymentToPay: PaymentProps) => Promise<void>
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
  const { addExchange } = useExchanges()

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

  async function deletePayment(paymentId: string) {
    const email = auth().currentUser?.email
    if (email) {
      const updatedPayments = payments.filter(
        (payment) => payment.id !== paymentId
      )
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

  async function editPayment(updatedPayment: PaymentProps) {
    const email = auth().currentUser?.email
    if (email) {
      const updatedPayments = payments.map((payment) =>
        payment.id === updatedPayment.id ? updatedPayment : payment
      )
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

  async function payPayment(paymentToPay: PaymentProps) {
    const email = auth().currentUser?.email
    if (email) {
      const date = new Date()

      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = String(date.getFullYear()).slice(-2)
      const fixedDateString = `${day}/${month}/${year}`

      const newExchange: ExchangeProps = {
        id: paymentToPay.id,
        details: paymentToPay.details,
        category: paymentToPay.category,
        type: 'GASTO',
        date: fixedDateString,
        price: paymentToPay.price,
      }

      addExchange(newExchange)

      deletePayment(paymentToPay.id)
    }
  }

  return (
    <PaymentContext.Provider
      value={{
        payments,
        addPayment,
        loadPayments,
        setPayments,
        deletePayment,
        deleteAllPayments,
        editPayment,
        payPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}
