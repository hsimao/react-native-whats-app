import styled from 'styled-components/native'

const Container = styled.View`
  margin-bottom: 10px;
`

const Title = styled.Text`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.text.text};
  font-family: 'bold';
  letter-spacing: 0.3px;
`

const PagetTitle = props => {
  return (
    <Container>
      <Title>{props.children}</Title>
    </Container>
  )
}

export default PagetTitle
