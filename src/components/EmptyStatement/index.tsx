import React from 'react'
import { Bold, Container, Title } from './styles'

export function EmptyStatement() {
  return (
    <Container>
      <Title>
        Você não cadastrou nenhuma {''}
        <Bold>transação</Bold>
        {''} desse tipo ainda!
      </Title>
    </Container>
  )
}
