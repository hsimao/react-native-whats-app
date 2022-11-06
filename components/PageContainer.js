import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  margin: 0 20px;
`

const PageContainer = props => {
  return <Container {...props}>{props.children}</Container>
}

export default PageContainer
