import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  padding: 10px 12px;
  border-radius: 18px;
`

export const ColumnLeft = styled.View`
  flex-direction: row;
  align-items: center;
`

export const ColumnRight = styled.View``

export const IconContainer = styled.View`
  width: 28px;
  align-items: center;
  justify-content: center;
`

export const Spacer = styled.View`
  height: 50px;
  margin-left: 22px;
  border-width: 0.8px;
  border-style: dashed;
  border-color: ${({ theme }) => theme.COLORS.GRAY_300};
`

export const ExchangeContainer = styled.View`
  padding-left: 20px;
`

export const ExchangeType = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.BRAND_DARK};
`

export const ExchangePrice = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`

export const ExchangeDetails = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_500};
`

export const ExchangeCategory = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_500};
`
