import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 52px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.BRAND_DARK};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  text-align: center;
`

export const Slogan = styled.Text`
  color: ${({ theme }) => theme.COLORS.BRAND_MID};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  text-align: center;
  margin-bottom: 240px;
`
