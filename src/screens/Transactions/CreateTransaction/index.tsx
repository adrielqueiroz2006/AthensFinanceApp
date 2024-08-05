import React, { useState } from 'react'
import { Platform, Switch, useColorScheme } from 'react-native'

import {
  DateButton,
  DateText,
  Input,
  InputContainer,
  InputRow,
  InputTitle,
  TransactionType,
  ValueInput,
} from './styles'

import { useTheme } from 'styled-components/native'

import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { Container } from '../../../components/Container'
import { Wrapper } from '../../../components/Wrapper'

export function CreateTransaction() {
  const [ganho, setGanho] = useState(false)
  const [showDate, setShowDate] = useState(false)
  const [date, setDate] = useState(new Date())
  const [value, setValue] = useState('')

  const themes = useTheme()

  const toggleSwitch = () => setGanho((previousState) => !previousState)

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date
    setShowDate(Platform.OS === 'ios')
    setDate(currentDate)
  }

  return (
    <Container>
      <Wrapper>
        <InputContainer>
          <InputTitle>Tipo de Transação</InputTitle>
          <InputRow>
            <TransactionType
              style={
                !ganho
                  ? { color: themes.COLORS.GRAY_900 }
                  : { color: themes.COLORS.GRAY_900 }
              }
            >
              Ganho
            </TransactionType>
            <Switch
              trackColor={{
                false: themes.COLORS.WHITE,
                true: themes.COLORS.WHITE,
              }}
              thumbColor={
                ganho ? themes.COLORS.BRAND_DARK : themes.COLORS.BRAND_DARK
              }
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
              value={value}
              placeholder="Ex: 20"
              keyboardType="numeric"
              onChangeText={(text) => setValue(text)}
              placeholderTextColor={themes.COLORS.GRAY_700}
            />
          </Input>
        </InputContainer>
      </Wrapper>
    </Container>
  )
}
