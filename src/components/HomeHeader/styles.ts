import styled from 'styled-components/native'
import { Image } from 'expo-image'

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`

export const Wrapper = styled.View`
  width: 100%;
  padding: 32px;
  padding-bottom: 28px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};

  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
`

export const Greeting = styled.View`
  flex: 1;
  margin-left: 12px;
`

export const Message = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_800};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`

export const Name = styled.Text`
  color: ${({ theme }) => theme.COLORS.BRAND_MID};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`

export const Picture = styled(Image)`
  width: 54px;
  height: 54px;
  border-radius: 12px;
`
