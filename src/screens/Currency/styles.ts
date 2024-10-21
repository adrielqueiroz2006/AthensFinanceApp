import styled from 'styled-components/native'
import { Image } from 'expo-image'

export const Container = styled.View`
  flex: 1;
  padding-top: 20px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`

export const Header = styled.View`
  width: 100%;
  padding: 15px;
  padding-bottom: 22px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};

  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
`

export const CoinContainer = styled.View`
  align-items: flex-end;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.BRAND_DARK};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`

export const PriceText = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_900};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`

export const Picture = styled(Image)`
  width: 54px;
  height: 54px;
  border-radius: 12px;
`
