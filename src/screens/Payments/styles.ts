import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

export const Header = styled.View`
  padding: 22px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
  padding: 12px;
`

export const TabWrapper = styled.View`
  flex: 1;
`

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.BRAND_DARK};
`

export const Button = styled(TouchableOpacity)`
  border-radius: 20px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.BRAND_MID};
`
