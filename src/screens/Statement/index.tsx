import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import { useExchanges } from '../../contexts/ExchangeContext'

import { Container } from '../../components/Container'
import { StatementCard } from '../../components/StatementCard'

import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { Dropdown } from 'react-native-element-dropdown'

import {
  Button,
  DateContainer,
  DateText,
  FilterContainer,
  FilterOption,
  FilterRow,
  FilterText,
  Header,
  InfoContainer,
  MonthContainer,
  MonthText,
  SearchInput,
  Title,
  TotalBalanceText,
  TotalBalanceValue,
  Wrapper,
} from './styles'

import {
  differenceInCalendarDays,
  format,
  isAfter,
  isBefore,
  isEqual,
  parse,
  startOfDay,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { useTheme } from 'styled-components'

import Icon from 'react-native-vector-icons/FontAwesome5'

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet'

import RNFS from 'react-native-fs'

import { statementCategories } from '../../utils/category'
import { statementPaymentTypes } from '../../utils/types'
import { statementTypes } from '../../utils/types'

import { EmptyStatement } from '../../components/EmptyStatement'
import { EmptyTransactionsStatement } from '../../components/EmptyTransactionsStatement'
import { DateFilter } from '../../components/DateFilter'

export function Statement() {
  const { exchanges, loadExchanges, iniDate, finDate } = useExchanges()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Categorias')
  const [paymentType, setPaymentType] = useState('Método')
  const [type, setType] = useState('Tipo')

  const navigation = useNavigation()
  const themes = useTheme()

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = ['55%']

  function handleCloseAction() {
    bottomSheetRef.current?.close()
  }

  function handleOpenAction() {
    bottomSheetRef.current?.expand()
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    []
  )

  const filteredExchanges = useMemo(() => {
    let filtered = exchanges

    if (iniDate.trim() !== '') {
      const initialDate = startOfDay(parse(iniDate, 'dd/MM/yy', new Date()))
      const finalDate = startOfDay(parse(finDate, 'dd/MM/yy', new Date()))

      filtered = filtered.filter((item) => {
        const dateItem = startOfDay(parse(item.date, 'dd/MM/yy', new Date()))
        return (
          (isAfter(dateItem, initialDate) || isEqual(dateItem, initialDate)) &&
          (isBefore(dateItem, finalDate) || isEqual(dateItem, finalDate))
        )
      })
    }
    if (type !== 'Tipo') {
      filtered = filtered.filter((item) => item.type === type.toUpperCase())
    }
    if (category !== 'Categorias') {
      filtered = filtered.filter((item) => item.category.name === category)
    }
    if (paymentType !== 'Método') {
      filtered = filtered.filter(
        (item) => item.paymentType.name === paymentType
      )
    }
    if (search) {
      filtered = filtered.filter((item) =>
        item.details.toLowerCase().includes(search.toLowerCase())
      )
    }
    return filtered
  }, [exchanges, type, category, paymentType, search, iniDate])

  const incomes = filteredExchanges.filter((item) => item.type === 'GANHO')
  const totalIncomes = incomes.reduce(
    (total, item) => total + Number(item.price),
    0
  )

  const expenses = filteredExchanges.filter((item) => item.type === 'GASTO')
  const totalExpenses = expenses.reduce(
    (total, item) => total + Number(item.price),
    0
  )

  const totalBalance = Number(totalIncomes) - Number(totalExpenses)

  function formatMonth(date: string) {
    return format(parse(date, 'dd/MM/yy', new Date()), 'MMMM', { locale: ptBR })
  }

  async function fetchExchanges() {
    try {
      await loadExchanges()
    } catch (error) {
      console.log(error)
    }
  }

  async function PDFDelete() {
    const documentsPath = `${RNFS.ExternalDirectoryPath}/Documents`

    const exists = await RNFS.exists(documentsPath)
    if (!exists) {
      return
    }

    await RNFS.unlink(documentsPath)
  }

  useFocusEffect(
    useCallback(() => {
      fetchExchanges()
      PDFDelete()
    }, [])
  )

  const styles = StyleSheet.create({
    placeholder: {
      fontSize: themes.FONT_SIZE.XS,
      fontFamily: themes.FONT_FAMILY.REGULAR,
      color: themes.COLORS.GRAY_900,
    },
  })

  return (
    <Container>
      <Header>
        <Title>Extrato</Title>
      </Header>

      {exchanges.length > 0 ? (
        <>
          <Wrapper>
            <FlatList
              keyExtractor={(item) => item.id}
              data={filteredExchanges}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => (
                <>
                  <InfoContainer style={{ flex: 1, flexDirection: 'row' }}>
                    <View>
                      <TotalBalanceText>Saldo Total </TotalBalanceText>
                      <TotalBalanceValue>
                        {totalBalance < 0 && '-'}R${' '}
                        {totalBalance.toFixed(2).replace('.', ',')}
                      </TotalBalanceValue>
                    </View>

                    {filteredExchanges.length > 0 && (
                      <>
                        <Button
                          onPress={() =>
                            navigation.navigate('statementDownload', {
                              statement: filteredExchanges,
                            })
                          }
                        >
                          <Icon
                            name="print"
                            size={15}
                            color={themes.COLORS.BACKGROUND}
                          />
                        </Button>
                      </>
                    )}
                  </InfoContainer>

                  <FilterContainer>
                    <FilterRow>
                      <FilterOption style={{ width: '60%' }}>
                        <Icon
                          name="search"
                          size={15}
                          color={themes.COLORS.GRAY_900}
                          style={{ paddingLeft: 10 }}
                        />
                        <SearchInput
                          placeholder="Pesquisa"
                          placeholderTextColor={themes.COLORS.GRAY_900}
                          autoCorrect={false}
                          value={search}
                          onChangeText={setSearch}
                        />
                      </FilterOption>

                      <FilterOption
                        style={{ flex: 1, justifyContent: 'space-between' }}
                        onPress={handleOpenAction}
                      >
                        <FilterText>
                          {iniDate.trim() !== ''
                            ? `${iniDate} - ${finDate}`
                            : `Datas`}
                        </FilterText>
                        <Icon
                          name="chevron-down"
                          size={12}
                          color={themes.COLORS.GRAY_400}
                          style={{ paddingRight: 10 }}
                        />
                      </FilterOption>
                    </FilterRow>

                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          width: Dimensions.get('screen').width / 2 - 6,
                        }}
                      >
                        <Dropdown
                          style={{
                            flex: 1,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            marginRight: 5,
                            borderRadius: 999,
                            borderWidth: 1.5,
                            borderColor: themes.COLORS.GRAY_300,
                          }}
                          data={statementTypes.map((type) => ({
                            id: type.id,
                            name: type.name,
                          }))}
                          renderRightIcon={() => (
                            <Icon
                              name="chevron-down"
                              size={12}
                              color={themes.COLORS.GRAY_400}
                            />
                          )}
                          value={type}
                          valueField={'name'}
                          labelField={'name'}
                          onChange={(item) => setType(item.name)}
                          placeholder="Tipo"
                          placeholderStyle={styles.placeholder}
                          selectedTextStyle={styles.placeholder}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          width: Dimensions.get('screen').width - 16,
                        }}
                      >
                        <Dropdown
                          style={{
                            flex: 1,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            marginRight: 5,
                            borderRadius: 999,
                            borderWidth: 1.5,
                            borderColor: themes.COLORS.GRAY_300,
                          }}
                          data={statementCategories.map((category) => ({
                            id: category.id,
                            name: category.name,
                          }))}
                          renderRightIcon={() => (
                            <Icon
                              name="chevron-down"
                              size={12}
                              color={themes.COLORS.GRAY_400}
                            />
                          )}
                          value={category}
                          valueField={'name'}
                          labelField={'name'}
                          onChange={(item) => setCategory(item.name)}
                          placeholder="Categorias"
                          placeholderStyle={styles.placeholder}
                          selectedTextStyle={styles.placeholder}
                        />

                        <Dropdown
                          style={{
                            flex: 1,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 999,
                            borderWidth: 1.5,
                            borderColor: themes.COLORS.GRAY_300,
                          }}
                          data={statementPaymentTypes.map((type) => ({
                            id: type.id,
                            name: type.name,
                          }))}
                          renderRightIcon={() => (
                            <Icon
                              name="chevron-down"
                              size={12}
                              color={themes.COLORS.GRAY_400}
                            />
                          )}
                          value={paymentType}
                          valueField={'name'}
                          labelField={'name'}
                          onChange={(item) => setPaymentType(item.name)}
                          placeholder="Método de transação"
                          placeholderStyle={styles.placeholder}
                          selectedTextStyle={styles.placeholder}
                        />
                      </View>
                    </ScrollView>
                  </FilterContainer>
                </>
              )}
              ListEmptyComponent={() => <EmptyStatement />}
              renderItem={({ item, index }) => (
                <View
                  style={{ flex: 1, paddingHorizontal: 22, paddingBottom: 22 }}
                >
                  {index === 0 ||
                  formatMonth(item.date) !==
                    formatMonth(filteredExchanges[index - 1].date) ? (
                    <MonthContainer>
                      <MonthText>
                        {formatMonth(item.date).charAt(0).toUpperCase() +
                          formatMonth(item.date).slice(1).toLowerCase()}
                      </MonthText>
                    </MonthContainer>
                  ) : null}

                  {index === 0 ||
                  item.date !== filteredExchanges[index - 1].date ? (
                    <DateContainer>
                      <DateText>
                        {differenceInCalendarDays(
                          parse(item.date, 'dd/MM/yy', new Date()),
                          new Date()
                        ) === 0
                          ? 'Hoje'
                          : item.date}
                      </DateText>
                    </DateContainer>
                  ) : null}

                  <StatementCard
                    key={item.id}
                    details={item.details}
                    paymentType={item.paymentType.name}
                    category={item.category.name}
                    type={item.type}
                    icon={item.category.icon}
                    date={item.date}
                    price={item.price.toString().replace('.', ',')}
                  />
                </View>
              )}
            />
          </Wrapper>

          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            backgroundStyle={{
              backgroundColor: themes.COLORS.GRAY_100,
              borderRadius: 20,
            }}
          >
            <BottomSheetView style={{ flex: 1 }}>
              <DateFilter onCloseAction={handleCloseAction} />
            </BottomSheetView>
          </BottomSheet>
        </>
      ) : (
        <EmptyTransactionsStatement />
      )}
    </Container>
  )
}
