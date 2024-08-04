import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

type Props = {
  children: ReactNode
}

export function Header({ children }: Props) {
  return <View style={styles.header}>{children}</View>
}

const styles = StyleSheet.create({
  header: {
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
