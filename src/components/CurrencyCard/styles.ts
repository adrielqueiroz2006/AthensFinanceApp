import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
  border-radius: 10px;
  padding: 10px 8px;
  margin: 6px 10px;
`
export const CoinContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const IconContainer = styled.View`
  margin-right: 8px;
`

export const IconImage = styled.Image`
  border-radius: 999px;

  height: 32px;
  width: 32px;
`

export const CoinTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_900};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`

export const ChartContainer = styled.View`
  padding: 2px 0px;
`

export const PriceContainer = styled.View`
  align-items: flex-end;
`

export const PriceText = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_900};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`

export const PercentageContaner = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`

export const PercentageText = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_900};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`
