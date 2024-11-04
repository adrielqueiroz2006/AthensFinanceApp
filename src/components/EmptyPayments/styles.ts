import styled from 'styled-components/native'

export type PaymentStyleProps = 'pendente' | 'vencida'

type Props = {
  type: PaymentStyleProps
}

export const Container = styled.View`
  flex: 1;
  padding: 18px;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_900};

  text-align: center;
`

export const Type = styled.Text<Props>`
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme, type }) =>
    type === 'pendente' ? theme.COLORS.GREEN : theme.COLORS.RED};
`
