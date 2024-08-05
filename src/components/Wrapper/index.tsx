import React, { ReactNode } from 'react'
import { StyleSheet, useColorScheme, View, ViewStyle } from 'react-native'
import { useTheme } from 'styled-components/native'

type Props = {
  children: ReactNode
}

export function Wrapper({ children }: Props) {
  const themes = useTheme()

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      padding: 22,
      backgroundColor: themes.COLORS.GRAY_100,
    } as ViewStyle,
  })

  return <View style={styles.wrapper}>{children}</View>
}
