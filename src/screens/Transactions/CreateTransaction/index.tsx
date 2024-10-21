import React, { useEffect, useState } from 'react'
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

import uuid from 'react-native-uuid'

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import { Picker } from '@react-native-picker/picker'
import { categories } from '../../../utils/category'

type TypeStyleProps = 'GANHO' | 'GASTO'

type Category = {
  id: number
  name: string
  icon: string
}

type ExchangeProps = {
  id: string
  category: Category
  type: TypeStyleProps
  date: string
  price: string
}

type RootParamList = {
  createTransaction: { currentTab: TypeStyleProps }
}

export function CreateTransaction() {
  const { addExchange } = useExchanges()

  const route = useRoute<RouteProp<RootParamList, 'createTransaction'>>()
  const { currentTab } = route.params

  const [category, setCategory] = useState({
    id: 1,
    name: 'Compras',
    icon: 'shopping-cart',
  })
  const [ganho, setGanho] = useState(currentTab === 'GASTO' ? true : false)
  const [showDate, setShowDate] = useState(false)
  const [date, setDate] = useState(new Date())
  const [fixedDate, setFixedDate] = useState('')
  const [price, setPrice] = useState('')

  const themes = useTheme()

  const navigation = useNavigation()

  const toggleSwitch = () => setGanho((previousState) => !previousState)

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

  async function handleAddExchange({
    id,
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
      category,
      type,
      date,
      price,
    }

    try {
      await addExchange(newExchange)
    } catch (error) {
      console.log(error)
    }

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
      <Header title="Nova Transação" />
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
              handleAddExchange({
                id: uuid.v4().toString(),
                category,
                type: !ganho ? 'GANHO' : 'GASTO',
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
