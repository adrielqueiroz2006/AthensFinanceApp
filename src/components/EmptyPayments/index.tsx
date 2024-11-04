import React from 'react'
import { Container, Title, Type } from './styles'

type TypeProps = {
  text: string
  type: 'conta' | 'pendente' | 'vencida'
}

export function EmptyPayments({ text, type }: TypeProps) {
  return (
    <Container>
      <Title>
        {text} {''}
        <Type type={type === 'vencida' ? 'vencida' : 'pendente'}>
          conta {type === 'conta' ? null : type + ' '}
        </Type>
        {''}ainda!
      </Title>
    </Container>
  )
}
