import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  border-radius: 16px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`

export const Wrapper = styled.View`
  flex: 1;
  padding: 20px;
`

export const IconWrapper = styled.View`
  align-items: flex-end;
  padding: 20px;
  margin-top: 6px;
`

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.BRAND_DARK};

  margin-bottom: 10px;
`

export const Value = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`
