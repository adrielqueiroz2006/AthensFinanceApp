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
  editTransaction: { exchange: ExchangeProps }
}

export function EditTransaction() {
  const { editExchange } = useExchanges()

  const route = useRoute<RouteProp<RootParamList, 'editTransaction'>>()
  const { exchange } = route.params

  const [ganho, setGanho] = useState(exchange.type === 'GASTO' ? true : false)
  const [showDate, setShowDate] = useState(false)
  const [date, setDate] = useState(exchange.date)
  const [price, setPrice] = useState(exchange.price)
  const [category, setCategory] = useState(exchange.category)

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

    const newExchange = {
      id,
      category,
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
                    false: themes.COLORS.GRAY_200,
                    true: themes.COLORS.GRAY_200,
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
                value={new Date()}
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
                category,
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
