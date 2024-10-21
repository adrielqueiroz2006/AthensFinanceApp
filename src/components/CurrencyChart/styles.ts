import styled from 'styled-components/native'

export const Container = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
  flex: 1;
`

export const CoinDetailsContainer = styled.View`
  padding: 0 20px 25px;
  gap: 10px;
`

export const CoinDetailsWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

export const IconContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  border-radius: 999px;
`

export const IconImage = styled.Image`
  height: 45px;
  width: 45px;
  border-radius: 999px;
`

export const ColumnLeft = styled.View`
  align-items: flex-start;
`

export const ColumnRight = styled.View`
  align-items: flex-end;
`

export const PercentageContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const CoinText = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_900};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`

export const CointDetailsText = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_400};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`

export const ChartContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`

export const TimeContainer = styled.View`
  padding-top: 25px;
  flex-direction: row;
  gap: 15px;
`
export const TimeOptionContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 40px;
  border-radius: 999px;
`

export const TimeOptionText = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_500};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`
