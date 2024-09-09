import React, { ReactNode } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from 'styled-components/native'

type Props = {
  children: ReactNode
}

export function Container({ children }: Props) {
  const themes = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themes.COLORS.BACKGROUND,
    } as ViewStyle,
  })

  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
}
