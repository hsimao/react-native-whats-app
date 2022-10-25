import styled from 'styled-components/native'

const Container = styled.View`
  margin: 0 20px;
`

const PageContainer = props => {
  return <Container>{props.children}</Container>
}

export default PageContainer
