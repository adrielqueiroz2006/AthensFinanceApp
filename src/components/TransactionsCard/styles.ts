import styled from 'styled-components/native'

export type PriceStyleProps = 'GANHO' | 'GASTO'

type Props = {
  type: PriceStyleProps
}

export const Container = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`

export const IconContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.BRAND_MID};
`

export const DetailsContainer = styled.View`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
  justify-content: space-between;
`

export const DetailTitle = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.BRAND_DARK};
`

export const DetailDate = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`

export const Price = styled.Text<Props>`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme, type }) =>
    type === 'GANHO' ? theme.COLORS.GREEN : theme.COLORS.RED};
`
