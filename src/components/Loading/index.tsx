import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, LoadIndicator } from './styles'

export function Loading() {
  return (
    <Container>
      <LoadIndicator />
    </Container>
  )
}
