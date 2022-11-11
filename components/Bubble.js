import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
`

const BaseContent = styled.View`
  background-color: white;
  border-radius: 6px;
  padding: 5px;
  margin-bottom: 10px;
  border: solid 1px #e2dacc;
`

const SystemContent = styled.View`
  margin-top: 10px;
  align-items: center;
  background-color: ${props => props.theme.colors.beige};
  border-radius: 6px;
  padding: 5px;
  margin-bottom: 10px;
  border: solid 1px #e2dacc;
`

const BaseText = styled.Text`
  font-family: regular;
  letter-spacing: 0.3px;
`

const SystemText = styled.Text`
  color: #64644a;
  font-family: regular;
  letter-spacing: 0.3px;
`

const Bubble = ({ text, type }) => {
  let CurrentText = BaseText
  let CurrentContent = BaseContent

  switch (type) {
    case 'system':
      CurrentText = SystemText
      CurrentContent = SystemContent

      break
  }

  return (
    <Container>
      <CurrentContent>
        <CurrentText>{text}</CurrentText>
      </CurrentContent>
    </Container>
  )
}

export default Bubble
