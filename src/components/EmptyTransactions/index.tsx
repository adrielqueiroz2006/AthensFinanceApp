import React from 'react'
import { Bold, Container, Title } from './styles'

export function EmptyTransactions() {
  return (
    <Container>
      <Title>
        Você não cadastrou nenhuma <Bold>Transação</Bold> ainda!
      </Title>
    </Container>
  )
}
