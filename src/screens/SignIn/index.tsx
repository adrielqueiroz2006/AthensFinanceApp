import React from 'react'
import { Container, Slogan, Title } from './styles'

import { Button } from '../../components/Button'

export function SignIn() {
  return (
    <Container>
      <Title>Athens Finance</Title>

      <Slogan>Gestão de finanças</Slogan>

      <Button title="Entrar com o Google" />
    </Container>
  )
}
