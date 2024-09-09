import { PriceStyleProps } from '../TransactionsCard/styles'

type Props = {
  date: string
  value: string
  details: string
  icon: string
  type: PriceStyleProps
}

export const transactionsData: Props[] = [
  {
    date: '30/05/24',
    value: '1122,75',
    details: 'Compra',
    type: 'GASTO',
    icon: 'shopping-cart',
  },
  {
    date: '22/05/24',
    value: '260,00',
    details: 'Venda',
    type: 'GANHO',
    icon: 'dollar-sign',
  },
  {
    date: '20/05/24',
    value: '35,50',
    details: 'Compra',
    type: 'GASTO',
    icon: 'shopping-cart',
  },
  {
    date: '15/05/24',
    value: '566,75',
    details: 'Compra',
    type: 'GASTO',
    icon: 'shopping-cart',
  },
  {
    date: '10/05/24',
    value: '2700,00',
    details: 'Salário',
    type: 'GANHO',
    icon: 'money-bill',
  },
]
