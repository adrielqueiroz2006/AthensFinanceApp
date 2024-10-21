import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ChartContainer,
  CoinDetailsContainer,
  CoinDetailsWrapper,
  CointDetailsText,
  CoinText,
  ColumnLeft,
  ColumnRight,
  Container,
  IconContainer,
  IconImage,
  PercentageContainer,
  TimeContainer,
  TimeOptionContainer,
  TimeOptionText,
} from './styles'
import { View } from 'react-native'

import axios from 'axios'

import ReanimatedGraph, {
  ReanimatedGraphPublicMethods,
} from '@birdwingo/react-native-reanimated-graph'

import Icon from '@expo/vector-icons/Ionicons'

import { CurrencyData } from '../../screens/Currency'

import { useFocusEffect } from '@react-navigation/native'

import { useTheme } from 'styled-components'

import USD_Icon from '../../icons/USD.png'
import EUR_Icon from '../../icons/EUR.png'
import GBP_Icon from '../../icons/GBP.png'
import JPY_Icon from '../../icons/JPY.png'
import BTC_Icon from '../../icons/BTC.png'
import ETH_Icon from '../../icons/ETH.png'

type CurrencyProps = {
  total: number
  baseCurrency: string
  onCloseAction: () => void
}

type GraphData = {
  xAxis: number[]
  yAxis: number[]
}

export function CurrencyChart({
  total,
  baseCurrency,
  onCloseAction,
}: CurrencyProps) {
  const [data, setData] = useState<GraphData>({ xAxis: [0], yAxis: [0] })
  const [price, setPrice] = useState<number>(0)
  const [change, setChange] = useState<number>(0)

  const [time, setTime] = useState(30)
  const [timeStamp, setTimeStamp] = useState<'Semana' | 'Mês' | 'Ano'>('Mês')

  const dataRef = useRef(data)
  const graphRef = useRef<ReanimatedGraphPublicMethods>(null)

  const themes = useTheme()

  function updateGraphData() {
    if (graphRef.current) {
      graphRef.current.updateData(data)
    }
  }

  useFocusEffect(
    useCallback(() => {
      dataRef.current = data
      updateGraphData()
    }, [data])
  )

  useEffect(() => {
    const fetchCurrencyHistory = async () => {
      try {
        const response = await axios.get(
          `https://economia.awesomeapi.com.br/json/daily/${baseCurrency}-BRL/${time.toString()}`
        )

        const data: CurrencyData[] = response.data
        const ratesArray: number[] = data.map((item) => parseFloat(item.bid))

        const chartData = {
          xAxis: Array.from({ length: ratesArray.length }, (_, i) => i),
          yAxis: ratesArray.reverse(),
        }

        setData(chartData)

        setPrice(
          chartData.yAxis.length > 0
            ? chartData.yAxis[chartData.yAxis.length - 1]
            : 0
        )

        setChange(
          chartData.yAxis.length > 0
            ? ((chartData.yAxis[chartData.yAxis.length - 1] -
                chartData.yAxis[0]) /
                chartData.yAxis[0]) *
                100
            : 0
        )

        updateGraphData()
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error)
      }
    }

    fetchCurrencyHistory()
  }, [baseCurrency, time])

  const imageMap: Record<typeof baseCurrency, any> = {
    USD: USD_Icon,
    EUR: EUR_Icon,
    GBP: GBP_Icon,
    JPY: JPY_Icon,
    BTC: BTC_Icon,
    ETH: ETH_Icon,
  }

  const coinSymbolMap: Record<typeof baseCurrency, any> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    BTC: '$',
    ETH: '$',
  }

  const themeKey = `${themes.COLORS.GRAY_100}-${themes.COLORS.GRAY_900}`

  return (
    <Container>
      <CoinDetailsContainer>
        <CoinDetailsWrapper>
          <IconImage source={imageMap[baseCurrency]} />

          <IconContainer onPress={onCloseAction}>
            <Icon
              name="close-outline"
              size={32}
              color={themes.COLORS.GRAY_900}
            />
          </IconContainer>
        </CoinDetailsWrapper>

        <CoinDetailsWrapper>
          <ColumnLeft>
            <CoinText>
              R$
              {(price > 1000 ? price.toFixed(1) : price.toFixed(3))
                .toString()
                .replace('.', ',')}
            </CoinText>

            <CoinText style={{ color: themes.COLORS.GRAY_500 }}>
              {baseCurrency}
            </CoinText>
          </ColumnLeft>

          <ColumnRight>
            <PercentageContainer>
              {change < 0 ? (
                <Icon
                  name="arrow-down-outline"
                  size={24}
                  color={themes.COLORS.RED}
                />
              ) : (
                <Icon
                  name="arrow-up-outline"
                  size={24}
                  color={themes.COLORS.GREEN}
                />
              )}

              <CoinText
                style={
                  change >= 0
                    ? { color: themes.COLORS.GREEN }
                    : { color: themes.COLORS.RED }
                }
              >
                {change.toFixed(2)}%
              </CoinText>
            </PercentageContainer>

            <CoinText
              style={
                change >= 0
                  ? { color: themes.COLORS.GREEN }
                  : { color: themes.COLORS.RED }
              }
            >
              {timeStamp} {time < 30 ? 'passada' : 'passado'}
            </CoinText>
          </ColumnRight>
        </CoinDetailsWrapper>
      </CoinDetailsContainer>

      <View style={{ height: 255 }}>
        {data ? (
          <ChartContainer>
            <ReanimatedGraph
              key={themeKey}
              containerStyle={{
                height: 350,
                backgroundColor: themes.COLORS.GRAY_100,
              }}
              ref={graphRef}
              xAxis={data.xAxis}
              yAxis={data.yAxis}
              color={themes.COLORS.GRAY_900}
              height={250}
              textStyle={{
                color: '#fff',
                fontSize: 16,
              }}
              onGestureUpdate={(gestureX, gestureY, index) => {
                const currentData = dataRef.current
                if (
                  currentData.yAxis.length > 0 &&
                  currentData.yAxis[0] !== 0
                ) {
                  setPrice(gestureY)

                  const initialPrice = currentData.yAxis[0]
                  setChange(((gestureY - initialPrice) / initialPrice) * 100)
                }
              }}
              onGestureEnd={() => {
                const currentData = dataRef.current
                const currentValue =
                  currentData.yAxis[currentData.yAxis.length - 1]

                setPrice(currentValue)

                const initialPrice = currentData.yAxis[0]

                setChange(((currentValue - initialPrice) / initialPrice) * 100)
              }}
            />
          </ChartContainer>
        ) : null}
      </View>

      <TimeContainer>
        <TimeOptionContainer
          style={
            time === 7 ? { backgroundColor: themes.COLORS.GRAY_100 } : null
          }
          onPress={() => (setTime(7), setTimeStamp('Semana'))}
        >
          <TimeOptionText
            style={time === 7 ? { color: themes.COLORS.GRAY_700 } : null}
          >
            1S
          </TimeOptionText>
        </TimeOptionContainer>

        <TimeOptionContainer
          style={
            time === 30 ? { backgroundColor: themes.COLORS.GRAY_200 } : null
          }
          onPress={() => (setTime(30), setTimeStamp('Mês'))}
        >
          <TimeOptionText
            style={time === 30 ? { color: themes.COLORS.GRAY_900 } : null}
          >
            1M
          </TimeOptionText>
        </TimeOptionContainer>

        <TimeOptionContainer
          style={
            time === 365 ? { backgroundColor: themes.COLORS.GRAY_200 } : null
          }
          onPress={() => (setTime(365), setTimeStamp('Ano'))}
        >
          <TimeOptionText
            style={time === 365 ? { color: themes.COLORS.GRAY_700 } : null}
          >
            1A
          </TimeOptionText>
        </TimeOptionContainer>
      </TimeContainer>

      <CoinDetailsContainer style={{ paddingBottom: 15 }}>
        <CoinDetailsWrapper>
          <ColumnLeft>
            <CointDetailsText>Conta</CointDetailsText>

            <CoinText>R${total.toFixed(2).replace('.', ',')}</CoinText>
          </ColumnLeft>

          <ColumnRight>
            <CointDetailsText>Valor</CointDetailsText>

            <CoinText>
              {coinSymbolMap[baseCurrency]}
              {total > 0 ? (total / price).toFixed(2) : 0.0}
            </CoinText>
          </ColumnRight>
        </CoinDetailsWrapper>
      </CoinDetailsContainer>
    </Container>
  )
}
