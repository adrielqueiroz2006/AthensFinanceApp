import React, { useState } from 'react'
import {
  Alert,
  Platform,
  ScrollView,
  Switch,
  Text,
  useColorScheme,
} from 'react-native'

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
import { exchangeCreate } from '../../../storage/exchanges/exchangeCreate'

import { useNavigation } from '@react-navigation/native'

import { Picker } from '@react-native-picker/picker'
import { categories } from '../../../utils/category'

type TypeStyleProps = 'GANHO' | 'GASTO'

type Category = {
  id: number
  name: string
  icon: string
}

export type ExchangeProps = {
  id: string
  category: Category
  type: TypeStyleProps
  date: string
  price: string
}

export function CreateTransaction() {
  const [category, setCategory] = useState({
    id: 1,
    name: 'Compras',
    icon: 'shopping-cart',
  })
  const [ganho, setGanho] = useState(false)
  const [showDate, setShowDate] = useState(false)
  const [date, setDate] = useState(new Date())
  const [price, setPrice] = useState('')

  const themes = useTheme()

  const navigation = useNavigation()

  const toggleSwitch = () => setGanho((previousState) => !previousState)

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date
    setShowDate(Platform.OS === 'ios')
    setDate(currentDate)
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

    const newExchange = {
      id,
      category,
      type,
      date,
      price,
    }

    try {
      await exchangeCreate(newExchange)
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
                  <DateText>{date.toDateString()}</DateText>
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
            onPress={() => {
              const day = String(date.getDate()).padStart(2, '0')
              const month = String(date.getMonth() + 1).padStart(2, '0')
              const year = String(date.getFullYear()).slice(-2)
              const fixedDate = `${day}/${month}/${year}`

              handleAddExchange({
                id: uuid.v4().toString(),
                category,
                type: !ganho ? 'GANHO' : 'GASTO',
                date: fixedDate,
                price: Number(price).toFixed(2),
              })
            }}
          />
        </ScrollView>
      </Wrapper>
    </Container>
  )
}
