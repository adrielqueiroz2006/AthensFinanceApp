import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding: 0px 22px;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const IconContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  border-radius: 999px;
`

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`

export const DateFilterContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  gap: 25px;
  margin-top: 30px;
`

export const DateFilterRow = styled.View`
  flex: 1;
  gap: 5px;
`

export const DateFilterTitle = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`

export const DateButton = styled.TouchableOpacity`
  justify-content: center;
  padding: 12px 18px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_200};
`

export const DateText = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_900};
`

export const ClearFilterButton = styled.TouchableOpacity`
  flex: 1;
  margin-bottom: 15px;
  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.COLORS.GRAY_300};
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_400};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`
