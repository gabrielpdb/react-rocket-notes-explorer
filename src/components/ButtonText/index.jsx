import { Container } from './styles'

export function ButtonText({ title, ...rest }) {
  // return <Container {...rest}>{title}</Container>

  return (
    <Container type="button" {...rest}>
      {title}
    </Container>
  )
}
