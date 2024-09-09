import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  margin-top: 20px;
`

export const Wrapper = styled.View`
  margin-top: 10px;
  border-radius: 16px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.BRAND_DARK};
`

export const CircularProgressContainer = styled.View`
  padding: 15px;
`

export const NumbersContainer = styled.View`
  flex: 1;
  padding: 10px;
  padding-left: 0;
  justify-content: center;
`

export const RowContainer = styled.View`
  margin-top: 5px;
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`

export const Info = styled.Text`
  margin-left: 5px;

  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.BACKGROUND};
`
