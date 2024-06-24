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
import theme from '../../theme'
import Icon from 'react-native-vector-icons/MaterialIcons'

export function Statistics() {
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
            activeStrokeColor={theme.COLORS.BRAND_NORMAL}
            inActiveStrokeColor={theme.COLORS.GRAY_900}
          />
        </CircularProgressContainer>

        <NumbersContainer>
          <RowContainer>
            <Icon name="circle" size={15} color={theme.COLORS.BRAND_NORMAL} />
            <Info style={{ color: theme.COLORS.GRAY_900 }}>Pago (58.3%)</Info>
          </RowContainer>

          <RowContainer>
            <Icon name="circle" size={15} color={theme.COLORS.GRAY_900} />
            <Info style={{ color: theme.COLORS.GRAY_900 }}>Salvo (41.7%)</Info>
          </RowContainer>
        </NumbersContainer>
      </Wrapper>
    </Container>
  )
}
