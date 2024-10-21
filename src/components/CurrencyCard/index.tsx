import React, { useEffect, useState } from 'react'

import {
  ChartContainer,
  CoinContainer,
  CoinTitle,
  Container,
  IconContainer,
  IconImage,
  PercentageContaner,
  PercentageText,
  PriceContainer,
  PriceText,
} from './styles'

import { useTheme } from 'styled-components'

import axios from 'axios'

import { LineChart } from 'react-native-chart-kit'

import USD_Icon from '../../icons/USD.png'
import EUR_Icon from '../../icons/EUR.png'
import GBP_Icon from '../../icons/GBP.png'
import JPY_Icon from '../../icons/JPY.png'
import BTC_Icon from '../../icons/BTC.png'
import ETH_Icon from '../../icons/ETH.png'

import Icon from '@expo/vector-icons/Ionicons'
import { CurrencyData, CurrencyProps } from '../../screens/Currency'

export function CurrencyCard({ baseCurrency }: CurrencyProps) {
  const [prices, setPrices] = useState<number[]>([])

  const themes = useTheme()

  useEffect(() => {
    const fetchCurrencyHistory = async () => {
      try {
        const response = await axios.get(
          `https://economia.awesomeapi.com.br/json/daily/${baseCurrency}-BRL/30`
        )

        const data: CurrencyData[] = response.data
        const ratesArray: number[] = data.map((item) => parseFloat(item.bid))
        setPrices(ratesArray.reverse())
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error)
      }
    }

    fetchCurrencyHistory()
  }, [baseCurrency])

  const coin = {
    price: prices.length > 0 ? prices[prices.length - 1] : 0,
    change:
      prices.length > 0
        ? ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100
        : 0,
  }

  const imageMap: Record<typeof baseCurrency, any> = {
    USD: USD_Icon,
    EUR: EUR_Icon,
    GBP: GBP_Icon,
    JPY: JPY_Icon,
    BTC: BTC_Icon,
    ETH: ETH_Icon,
  }

  return (
    <Container>
      <CoinContainer>
        <IconContainer>
          <IconImage source={imageMap[baseCurrency]} />
        </IconContainer>
        <CoinTitle>{baseCurrency}</CoinTitle>
      </CoinContainer>

      <ChartContainer>
        <LineChart
          withVerticalLabels={false}
          withHorizontalLabels={false}
          withDots={false}
          withInnerLines={false}
          withVerticalLines={false}
          withOuterLines={false}
          data={{
            labels: Array.from(
              { length: prices.length },
              (_, i) => `Dia ${i + 1}`
            ),
            datasets: [
              {
                data: prices.length > 0 ? prices : Array(30).fill(0),
              },
            ],
          }}
          width={100}
          height={60}
          chartConfig={{
            backgroundColor: themes.COLORS.GRAY_100,
            backgroundGradientFrom: themes.COLORS.GRAY_100,
            backgroundGradientTo: themes.COLORS.GRAY_100,
            color: () =>
              coin.change < 0 ? themes.COLORS.RED : themes.COLORS.GREEN,
            strokeWidth: 2,
            fillShadowGradientTo: themes.COLORS.GRAY_100,
            fillShadowGradientOpacity: 0,
          }}
          bezier
          style={{
            paddingRight: 0,
            paddingBottom: 2,
          }}
        />
      </ChartContainer>

      <PriceContainer>
        <PriceText>
          R$ {coin.price > 100 ? coin.price.toFixed(0) : coin.price.toFixed(3)}
        </PriceText>
        <PercentageContaner>
          {coin.change < 0 ? (
            <Icon
              name="arrow-down-outline"
              size={15}
              color={themes.COLORS.RED}
            />
          ) : (
            <Icon
              name="arrow-up-outline"
              size={15}
              color={themes.COLORS.GREEN}
            />
          )}
          <PercentageText
            style={
              coin.change < 0
                ? { color: themes.COLORS.RED }
                : { color: themes.COLORS.GREEN }
            }
          >
            {coin.change.toFixed(2)}%
          </PercentageText>
        </PercentageContaner>
      </PriceContainer>
    </Container>
  )
}
