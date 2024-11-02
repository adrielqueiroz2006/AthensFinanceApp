import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 18px 12px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  border-width: 1px;
  border-radius: 18px;
  border-color: ${({ theme }) => theme.COLORS.GRAY_200};
`

export const IconContainer = styled.View`
  width: 45px;
  height: 45px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.BRAND_MID};
`

export const DetailsContainer = styled.View`
  flex: 1;
  gap: 4px;
  margin-left: 10px;
  margin-right: 10px;
  justify-content: space-between;
`

export const DetailTitle = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.BRAND_DARK};
`

export const DetailDate = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`

export const PriceContainer = styled.View`
  gap: 4px;
  align-items: flex-end;
  justify-content: space-between;
`

export const Price = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`

export const PriceTypeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 3px;
  padding: 1px 5px;
  border-width: 1px;
  border-radius: 999px;
  border-color: ${({ theme }) => theme.COLORS.BLUE};
  background-color: rgba(0, 158, 229, 0.05);
`

export const PriceType = styled.Text`
  font-size: 11px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`
