import styled from 'styled-components/native'

export const Header = styled.View`
  padding: 22px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.BRAND_DARK};
`

export const Button = styled.TouchableOpacity`
  border-radius: 20px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.BRAND_MID};
`

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`

export const FilterContainer = styled.View`
  padding: 0 8px;
`

export const FilterRow = styled.View`
  flex-direction: row;
  gap: 5px;
  padding-bottom: 8px;
`

export const FilterOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 999px;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.COLORS.GRAY_300};
`

export const FilterText = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
  padding: 0 8px;
`

export const SearchInput = styled.TextInput`
  padding-left: 8px;
  font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
  flex: 1;
`

export const InfoContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 0 22px 15px;
`

export const TotalBalanceText = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`

export const TotalBalanceValue = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`

export const MonthContainer = styled.View`
  flex: 1;
  padding: 5px 0;
`

export const MonthText = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`

export const DateContainer = styled.View`
  flex: 1;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.GRAY_300};
  padding: 5px 0;
`

export const DateText = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_500};
`
