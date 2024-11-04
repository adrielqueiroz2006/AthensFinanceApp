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

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import { Picker } from '@react-native-picker/picker'
import { categories } from '../../../utils/category'

import { types } from '../../../utils/types'
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
  type: PaymentType
  category: Category
  details: string
  date: string
  price: string
}

type RootParamList = {
  editPayment: { payment: PaymentProps }
}

export function EditPayment() {
  const { editPayment } = usePayments()

  const route = useRoute<RouteProp<RootParamList, 'editPayment'>>()
  const { payment } = route.params

  const [type, setType] = useState(payment.type)
  const [category, setCategory] = useState(payment.category)
  const [details, setDetails] = useState(payment.details)
  const [showDate, setShowDate] = useState(false)
  const [date, setDate] = useState(payment.date)
  const [price, setPrice] = useState(payment.price)

  const themes = useTheme()

  const navigation = useNavigation()

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date()
    setShowDate(Platform.OS === 'ios')

    const day = String(currentDate.getDate()).padStart(2, '0')
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const year = String(currentDate.getFullYear()).slice(-2)
    const fixedDate = `${day}/${month}/${year}`
    setDate(fixedDate)
  }

  async function handleEditPayment({
    id,
    details,
    category,
    date,
    price,
  }: PaymentProps) {
    if (Number(price) <= 0)
      return Alert.alert('Valor inválido', 'Informe um valor para essa conta!')

    if (isNaN(Number(price))) {
      return Alert.alert('Valor inválido', 'Informe um valor para essa conta!')
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
      await editPayment(newPayment)
    } catch (error) {
      console.log(error)
    }

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
                  <DateText>{date}</DateText>
                </DateButton>
              </Input>
            </InputContainer>

            {showDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={parse(date, 'dd/MM/yy', new Date())}
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
              handleEditPayment({
                id: payment.id,
                details,
                type,
                category,
                date: date,
                price: Number(price.replace(',', '.')).toFixed(2),
              })
            }}
          />
        </ScrollView>
      </Wrapper>
    </Container>
  )
}
