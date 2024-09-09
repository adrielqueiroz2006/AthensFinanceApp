import React from 'react'
import { Container, Title, Type } from './styles'

type TypeProps = {
  type: 'ganho' | 'gasto'
}

export function EmptyExchanges({ type }: TypeProps) {
  return (
    <Container>
      <Title>
        Você não cadastrou nenhum {''}
        <Type type={type}>{type}</Type>
        {''} ainda!
      </Title>
    </Container>
  )
}
