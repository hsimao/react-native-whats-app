import React from 'react'
import styled from 'styled-components/native'
import { colors } from '../theme/colors'

const Container = styled.View`
  flex-direction: row;
  justify-content: ${({ position }) => (position ? position : 'center')};
`

const BaseContent = styled.View`
  border-radius: 6px;
  padding: 5px;
  margin-bottom: 10px;
  border: solid 1px #e2dacc;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : 'white')}
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '0')}px;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '100%')};
`

const BaseText = styled.Text`
  font-family: regular;
  letter-spacing: 0.3px;
  ${({ color }) => (color ? `color: ${color}` : '')};
`

const Bubble = ({ text, type }) => {
  let position = 'center'
  let bgColor = 'white'
  let marginTop = 0
  let textColor = ''
  let maxWidth = '100%'

  switch (type) {
    case 'system':
      bgColor = colors.beige
      marginTop = 10
      textColor = '#64644a'
      break
    case 'error':
      bgColor = colors.red
      marginTop = 10
      textColor = 'white'
      break
    case 'myMessage':
      position = 'flex-end'
      bgColor = colors.primaryLight
      maxWidth = '90%'
      break
    case 'theirMessage':
      position = 'flex-start'
      maxWidth = '90%'

      break
  }

  return (
    <Container position={position}>
      <BaseContent maxWidth={maxWidth} bgColor={bgColor} marginTop={marginTop}>
        <BaseText color={textColor}>{text}</BaseText>
      </BaseContent>
    </Container>
  )
}

export default Bubble
