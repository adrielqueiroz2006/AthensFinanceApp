import { TouchableOpacityProps } from 'react-native'
import { Container, Loading, Title } from './styles'

type isWhiteProps = 'WHITE' | 'BLACK'

type Props = TouchableOpacityProps & {
  isWhite: isWhiteProps
  title: string
  isLoading?: boolean
}

export function Button({ isWhite, title, isLoading = false, ...rest }: Props) {
  return (
    <Container activeOpacity={0.7} disabled={isLoading} {...rest}>
      {isLoading ? (
        <Loading isWhite={isWhite} />
      ) : (
        <Title isWhite={isWhite}>{title}</Title>
      )}
    </Container>
  )
}
