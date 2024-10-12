import styled from 'styled-components/native'

type Props = {
  isWhite: 'WHITE' | 'BLACK'
}

export const Container = styled.TouchableOpacity`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.BRAND_MID};
`

export const Title = styled.Text<Props>`
  color: ${({ theme, isWhite }) =>
    isWhite === 'WHITE' ? 'white' : theme.COLORS.BACKGROUND};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`

export const Loading = styled.ActivityIndicator.attrs<Props>(
  ({ theme, isWhite }) => ({
    size: 28,
    color: isWhite === 'WHITE' ? 'white' : theme.COLORS.BACKGROUND,
  })
)``
