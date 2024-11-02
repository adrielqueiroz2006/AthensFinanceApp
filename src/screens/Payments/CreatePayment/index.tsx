import React, { useEffect, useState } from 'react'
import { Alert, Platform, ScrollView, Switch } from 'react-native'

import { usePayments } from '../../../contexts/PaymentContext'

import {
  DateButton,
  DateText,
  Input,
  InputContainer,
  InputMenu,
  InputRow,
  InputTitle,
  TransactionType,
  ValueInput,
  Wrapper,
} from './styles'

import { useTheme } from 'styled-components/native'

import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { Container } from '../../../components/Container'
import { Header } from '../../../components/Header'
import { Button } from '../../../components/Button'

import uuid from 'react-native-uuid'

import { useNavigation } from '@react-navigation/native'

import { Picker } from '@react-native-picker/picker'

import { categories } from '../../../utils/category'
import { types } from '../../../utils/types'

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
  type: PaymentType
  category: Category
  details: string
  date: string
  price: string
}

export function CreatePayment() {
  const { addPayment } = usePayments()

  const [type, setType] = useState({
    id: 1,
    name: 'Cartão de Crédito',
  })
  const [category, setCategory] = useState({
    id: 1,
    name: 'Compras',
    icon: 'shopping-cart',
  })
  const [details, setDetails] = useState('')
  const [showDate, setShowDate] = useState(false)
  const [date, setDate] = useState(new Date())
  const [fixedDate, setFixedDate] = useState('')
  const [price, setPrice] = useState('')

  const themes = useTheme()

  const navigation = useNavigation()

  function onChangeFixedDate() {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear()).slice(-2)
    const fixedDateString = `${day}/${month}/${year}`

    setFixedDate(fixedDateString)
  }

  useEffect(() => {
    onChangeFixedDate()
  })

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date
    setShowDate(Platform.OS === 'ios')
    setDate(currentDate)
    onChangeFixedDate()
  }

  async function handleAddPayment({
    id,
    details,
    category,
    date,
    price,
  }: PaymentProps) {
    if (Number(price) <= 0)
      return Alert.alert(
        'Valor inválido',
        'Informe um valor para essa transação!'
      )

    if (isNaN(Number(price))) {
      return Alert.alert(
        'Valor inválido',
        'Informe um valor para essa transação!'
      )
    }

    const newPayment = {
      id,
      details,
      type,
      category,
      date,
      price,
    }

    try {
      await addPayment(newPayment)
    } catch (error) {
      console.log(error)
    }

    setType({
      id: 1,
      name: 'Cartão de Crédito',
    })
    setCategory({
      id: 1,
      name: 'Compras',
      icon: 'shopping-cart',
    })
    setDate(new Date())
    setPrice('')

    navigation.goBack()
  }

  return (
    <Container>
      <Header title="Adicionar Conta" />
      <Wrapper>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
          keyboardShouldPersistTaps="handled"
        >
          <InputMenu>
            <InputContainer>
              <InputTitle>Detalhes (Opcional)</InputTitle>
              <Input>
                <ValueInput
                  value={details}
                  placeholder="Detalhes"
                  onChangeText={(text) => setDetails(text)}
                  placeholderTextColor={themes.COLORS.GRAY_900}
                />
              </Input>
            </InputContainer>

            <InputContainer>
              <InputTitle>Tipo de pagamento</InputTitle>
              <Picker
                selectedValue={type}
                onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                style={{
                  padding: 10,
                  marginTop: 10,
                  borderRadius: 8,
                  backgroundColor: themes.COLORS.GRAY_100,
                  color: themes.COLORS.GRAY_900,
                }}
                dropdownIconColor={themes.COLORS.GRAY_900}
                itemStyle={{
                  color: themes.COLORS.GRAY_900,
                }}
              >
                {types.map((type, index) => (
                  <Picker.Item key={index} label={type.name} value={type} />
                ))}
              </Picker>
            </InputContainer>

            <InputContainer>
              <InputTitle>Categoria</InputTitle>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                style={{
                  padding: 10,
                  marginTop: 10,
                  borderRadius: 8,
                  backgroundColor: themes.COLORS.GRAY_100,
                  color: themes.COLORS.GRAY_900,
                }}
                dropdownIconColor={themes.COLORS.GRAY_900}
                itemStyle={{
                  color: themes.COLORS.GRAY_900,
                }}
              >
                {categories.map((category, index) => (
                  <Picker.Item
                    key={index}
                    label={category.name}
                    value={category}
                  />
                ))}
              </Picker>
            </InputContainer>

            <InputContainer>
              <InputTitle>Data</InputTitle>
              <Input>
                <DateButton onPress={() => setShowDate(true)}>
                  <DateText>{fixedDate}</DateText>
                </DateButton>
              </Input>
            </InputContainer>

            {showDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="calendar"
                onChange={onChangeDate}
              />
            )}

            <InputContainer>
              <InputTitle>Valor</InputTitle>
              <Input>
                <ValueInput
                  value={price}
                  placeholder="Ex: 20.00"
                  keyboardType="numeric"
                  onChangeText={(text) => setPrice(text)}
                  placeholderTextColor={themes.COLORS.GRAY_900}
                />
              </Input>
            </InputContainer>
          </InputMenu>

          <Button
            title="Salvar"
            isWhite={'BLACK'}
            onPress={() => {
              handleAddPayment({
                id: uuid.v4().toString(),
                details,
                type,
                category,
                date: fixedDate,
                price: Number(price.replace(',', '.')).toFixed(2),
              })
            }}
          />
        </ScrollView>
      </Wrapper>
    </Container>
  )
}
