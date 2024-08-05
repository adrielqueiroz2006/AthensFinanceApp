import styled from 'styled-components/native'

export const InputContainer = styled.View`
  margin-bottom: 20px;
`

export const Input = styled.View`
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`

export const InputTitle = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.BRAND_DARK};
`

export const InputRow = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const TransactionType = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`

export const DateButton = styled.TouchableOpacity``

export const DateText = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`

export const ValueInput = styled.TextInput`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`