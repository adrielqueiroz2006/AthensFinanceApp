import React from 'react'
import {
  CircularProgressContainer,
  Container,
  Info,
  NumbersContainer,
  RowContainer,
  Title,
  Wrapper,
} from './styles'
import CircularProgress from 'react-native-circular-progress-indicator'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useTheme } from 'styled-components/native'

type financeCardProps = {
  income: number
  expense: number
}

export function Statistics({ income, expense }: financeCardProps) {
  const themes = useTheme()

  const paid = Number(income)
  const saved = Number(income) - Number(expense)

  const totalSaved = Number((saved * 100) / paid).toFixed(1)

  return (
    <Container>
      <Title>Resumo</Title>

      <Wrapper>
        <CircularProgressContainer>
          <CircularProgress
            radius={70}
            value={Number(totalSaved)}
            duration={1000}
            activeStrokeWidth={20}
            inActiveStrokeWidth={20}
            showProgressValue={false}
            activeStrokeColor={themes.COLORS.BRAND_MID}
            inActiveStrokeColor={themes.COLORS.GRAY_900}
          />
        </CircularProgressContainer>

        <NumbersContainer>
          <RowContainer>
            <Icon name="circle" size={15} color={themes.COLORS.BRAND_MID} />
            <Info style={{ color: themes.COLORS.GRAY_900 }}>
              Pago{' '}
              {Number(totalSaved) > 0
                ? (100 - Number(totalSaved)).toFixed(1)
                : 0}
              %
            </Info>
          </RowContainer>

          <RowContainer>
            <Icon name="circle" size={15} color={themes.COLORS.GRAY_900} />
            <Info style={{ color: themes.COLORS.GRAY_900 }}>
              Salvo {Number(totalSaved) > 0 ? totalSaved : 0}%
            </Info>
          </RowContainer>
        </NumbersContainer>
      </Wrapper>
    </Container>
  )
}
