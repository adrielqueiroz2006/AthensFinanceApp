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

export function Statistics() {
  const themes = useTheme()

  return (
    <Container>
      <Title>Resumo</Title>

      <Wrapper>
        <CircularProgressContainer>
          <CircularProgress
            radius={70}
            value={58.3}
            duration={1000}
            activeStrokeWidth={20}
            inActiveStrokeWidth={20}
            showProgressValue={false}
            activeStrokeColor={themes.COLORS.BRAND_NORMAL}
            inActiveStrokeColor={themes.COLORS.GRAY_900}
          />
        </CircularProgressContainer>

        <NumbersContainer>
          <RowContainer>
            <Icon name="circle" size={15} color={themes.COLORS.BRAND_NORMAL} />
            <Info style={{ color: themes.COLORS.GRAY_900 }}>Pago (58.3%)</Info>
          </RowContainer>

          <RowContainer>
            <Icon name="circle" size={15} color={themes.COLORS.GRAY_900} />
            <Info style={{ color: themes.COLORS.GRAY_900 }}>Salvo (41.7%)</Info>
          </RowContainer>
        </NumbersContainer>
      </Wrapper>
    </Container>
  )
}
