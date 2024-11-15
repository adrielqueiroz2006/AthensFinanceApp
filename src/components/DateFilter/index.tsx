import React, { useEffect, useState } from 'react'
import { Alert, Platform } from 'react-native'

import {
  ButtonText,
  ClearFilterButton,
  Container,
  DateButton,
  DateFilterContainer,
  DateFilterRow,
  DateFilterTitle,
  DateText,
  Header,
  IconContainer,
  Title,
} from './styles'

import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'

import { Button } from '../Button'

import Icon from '@expo/vector-icons/Ionicons'

import { useTheme } from 'styled-components'

import { useExchanges } from '../../contexts/ExchangeContext'
import { isAfter, parse, startOfDay } from 'date-fns'

type Props = {
  onCloseAction: () => void
}

export function DateFilter({ onCloseAction }: Props) {
  const { setIniDate, setFinDate } = useExchanges()

  const [initialDate, setInitialDate] = useState(new Date())
  const [finalDate, setFinalDate] = useState(new Date())
  const [fixedInitialDate, setInitialFixedDate] = useState('')
  const [fixedFinalDate, setFinalFixedDate] = useState('')

  const [showInitialDate, setShowInitalDate] = useState(false)
  const [showFinalDate, setShowFinalDate] = useState(false)

  const themes = useTheme()

  const onChangeInitialDate = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || initialDate
    setShowInitalDate(Platform.OS === 'ios')
    setInitialDate(currentDate)

    const day = String(currentDate.getDate()).padStart(2, '0')
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const year = String(currentDate.getFullYear()).slice(-2)
    const fixedDateString = `${day}/${month}/${year}`

    setInitialFixedDate(fixedDateString)
  }

  const onChangeFinalDate = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || finalDate
    setShowFinalDate(Platform.OS === 'ios')
    setFinalDate(currentDate)

    const day = String(currentDate.getDate()).padStart(2, '0')
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const year = String(currentDate.getFullYear()).slice(-2)
    const fixedDateString = `${day}/${month}/${year}`

    setFinalFixedDate(fixedDateString)
  }

  function handleFilterDates() {
    if (fixedInitialDate === '' && fixedFinalDate !== '') {
      return Alert.alert('Data inválida', 'Informe uma data inicial!')
    } else if (fixedFinalDate === '' && fixedInitialDate !== '') {
      return Alert.alert('Data inválida', 'Informe uma data final!')
    } else if (
      isAfter(
        startOfDay(parse(fixedInitialDate, 'dd/MM/yy', new Date())),
        startOfDay(parse(fixedFinalDate, 'dd/MM/yy', new Date()))
      )
    ) {
      return Alert.alert(
        'Data inválida',
        'Informe uma data final superior à data inicial!'
      )
    }
    onCloseAction()
    setIniDate(fixedInitialDate)
    setFinDate(fixedFinalDate)
  }

  async function handleClearFilters() {
    setInitialDate(new Date())
    setFinalDate(new Date())
    setInitialFixedDate('')
    setFinalFixedDate('')
    setIniDate('')
    setFinDate('')
    onCloseAction()
  }

  return (
    <Container>
      <Header>
        <Title>Datas</Title>
        <IconContainer onPress={onCloseAction}>
          <Icon name="close-outline" size={32} color={themes.COLORS.GRAY_900} />
        </IconContainer>
      </Header>

      <DateFilterContainer>
        <DateFilterRow>
          <DateFilterTitle>Data Inicial</DateFilterTitle>

          <DateButton onPress={() => setShowInitalDate(true)}>
            <DateText>{fixedInitialDate}</DateText>
          </DateButton>
          {showInitialDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={initialDate}
              mode="date"
              display="calendar"
              onChange={onChangeInitialDate}
            />
          )}
        </DateFilterRow>

        <DateFilterRow>
          <DateFilterTitle>Data Final</DateFilterTitle>

          <DateButton onPress={() => setShowFinalDate(true)}>
            <DateText>{fixedFinalDate}</DateText>
          </DateButton>
          {showFinalDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={finalDate}
              mode="date"
              display="calendar"
              onChange={onChangeFinalDate}
            />
          )}
        </DateFilterRow>
      </DateFilterContainer>
      <ClearFilterButton onPress={() => handleClearFilters()}>
        <ButtonText>Limpar</ButtonText>
      </ClearFilterButton>
      <Button
        isWhite="WHITE"
        title="Filtrar"
        style={{ marginBottom: 25 }}
        onPress={() => handleFilterDates()}
      />
    </Container>
  )
}
