import React, { useState } from 'react'
import { Alert, Platform, ScrollView, Switch } from 'react-native'

import { useExchanges } from '../../../contexts/ExchangeContext'

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

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import { Picker } from '@react-native-picker/picker'

import { categories } from '../../../utils/category'
import { types as payTypes } from '../../../utils/types'

import { parse } from 'date-fns'

type TypeStyleProps = 'GANHO' | 'GASTO'

type Category = {
  id: number
  name: string
  icon: string
}

type PaymentType = {
  id: number
  name: string
}

type ExchangeProps = {
  id: string
  details: string
  category: Category
  paymentType: PaymentType
  type: TypeStyleProps
  date: string
  price: string
}

type RootParamList = {
  editTransaction: { exchange: ExchangeProps }
}

export function EditTransaction() {
  const { editExchange } = useExchanges()

  const route = useRoute<RouteProp<RootParamList, 'editTransaction'>>()
  const { exchange } = route.params

  const [details, setDetails] = useState(exchange.details)
  const [category, setCategory] = useState(exchange.category)
  const [paymentType, setPaymentType] = useState(exchange.paymentType)
  const [ganho, setGanho] = useState(exchange.type === 'GASTO' ? true : false)
  const [showDate, setShowDate] = useState(false)
  const [date, setDate] = useState(exchange.date)
  const [price, setPrice] = useState(exchange.price)

  const themes = useTheme()

  const navigation = useNavigation()

  const toggleSwitch = () => setGanho((previousState) => !previousState)

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date()
    setShowDate(Platform.OS === 'ios')

    const day = String(currentDate.getDate()).padStart(2, '0')
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const year = String(currentDate.getFullYear()).slice(-2)
    const fixedDate = `${day}/${month}/${year}`
    setDate(fixedDate)
  }

  async function handleEditExchange({
    id,
    details,
    category,
    type,
    date,
    price,
  }: ExchangeProps) {
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

    const newExchange = {
      id,
      details,
      category,
      paymentType,
      type,
      date,
      price,
    }

    try {
      await editExchange(newExchange)
    } catch (error) {
      console.log(error)
    }

    navigation.goBack()
  }

  return (
    <Container>
      <Header title="Editar Transação" />
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
              <InputTitle>Método de transação</InputTitle>
              <Picker
                selectedValue={paymentType}
                onValueChange={(itemValue, itemIndex) =>
                  setPaymentType(itemValue)
                }
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
                {payTypes.map((type, index) => (
                  <Picker.Item key={index} label={type.name} value={type} />
                ))}
              </Picker>
            </InputContainer>

            <InputContainer>
              <InputTitle>Tipo de Transação</InputTitle>
              <InputRow>
                <TransactionType
                  style={
                    !ganho
                      ? { color: themes.COLORS.BRAND_DARK }
                      : { color: themes.COLORS.GRAY_900 }
                  }
                >
                  Ganho
                </TransactionType>
                <Switch
                  thumbColor={themes.COLORS.BRAND_DARK}
                  trackColor={{
                    false: themes.COLORS.GRAY_300,
                    true: themes.COLORS.GRAY_300,
                  }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={ganho}
                />
                <TransactionType
                  style={
                    ganho
                      ? { color: themes.COLORS.BRAND_DARK }
                      : { color: themes.COLORS.GRAY_900 }
                  }
                >
                  Gasto
                </TransactionType>
              </InputRow>
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
              handleEditExchange({
                id: exchange.id,
                details,
                category,
                paymentType,
                type: !ganho ? 'GANHO' : 'GASTO',
                date: date,
                price: Number(price).toFixed(2),
              })
            }}
          />
        </ScrollView>
      </Wrapper>
    </Container>
  )
}
