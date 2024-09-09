import React, { ReactNode } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native'
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

  return (
    <KeyboardAvoidingView style={styles.wrapper}>
      {children}
    </KeyboardAvoidingView>
  )
}
