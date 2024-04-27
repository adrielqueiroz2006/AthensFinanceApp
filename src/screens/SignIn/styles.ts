import styled from 'styled-components/native'
import { Image } from 'expo-image'

export const Container = styled.View`
  flex: 1;

  background: ${({ theme }) => theme.COLORS.BRAND_MID};
`

export const Wrapper = styled.View`
  justify-content: center;
  align-items: center;

  height: 76%;

  background: rgba(0, 0, 0, 0.5);
`

export const Logo = styled(Image)`
  width: 215px;
  height: 215px;

  margin-top: 70px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  text-align: center;
`

export const Slogan = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  text-align: center;
`

export const ButtonWrapper = styled.View`
  flex: 1;
  justify-content: center;
  padding: 52px;
  margin-top: -15px;

  border-top-left-radius: 15px;
  border-top-right-radius: 15px;

  background: ${({ theme }) => theme.COLORS.WHITE};
`
