import React, { ReactNode } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'

import { useTheme } from 'styled-components/native'

import { useNavigation } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/FontAwesome5'

type Props = {
  title: string
}

export function Header({ title }: Props) {
  const navigation = useNavigation()
  const themes = useTheme()

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ padding: 5, alignItems: 'flex-start' }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-left" color={themes.COLORS.GRAY_900} size={20} />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 20,
          fontFamily: themes.FONT_FAMILY.BOLD,
          color: themes.COLORS.GRAY_900,
        }}
      >
        {title}
      </Text>

      <Icon name="chevron-right" color={themes.COLORS.BACKGROUND} size={25} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
