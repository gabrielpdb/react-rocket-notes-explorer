import { Container } from './styles'

export function ButtonText({ title, isActive = false, ...rest }) {
  // return <Container {...rest}>{title}</Container>

  return (
    <Container type="button" isActive={isActive} {...rest}>
      {title}
    </Container>
  )
}
