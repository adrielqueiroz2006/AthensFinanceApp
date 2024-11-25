import React from 'react'
import { Bold, Container, Title } from './styles'

export function EmptyTransactionsStatement() {
  return (
    <Container>
      <Title>
        Você não cadastrou nenhuma <Bold>transação</Bold> ainda!
      </Title>
    </Container>
  )
}
