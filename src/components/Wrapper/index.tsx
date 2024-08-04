import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

type Props = {
  children: ReactNode
}

export function Wrapper({ children }: Props) {
  return <View style={styles.wrapper}>{children}</View>
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 22,
    backgroundColor: '#f1f1f1',
  },
})
