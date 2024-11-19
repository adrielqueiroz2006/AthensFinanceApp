import styled from 'styled-components/native'

export const Header = styled.View`
  padding: 25px 22px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.BRAND_DARK};
`

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`
