import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background-color: white;
`

const PageContainer = props => {
  return <Container {...props}>{props.children}</Container>
}

export default PageContainer
