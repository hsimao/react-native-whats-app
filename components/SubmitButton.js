import styled from 'styled-components/native'
import { colors } from '../theme/colors'

const Container = styled.TouchableOpacity`
  background-color: ${props => props.bgColor};
  padding: 10px 30px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`

const SubmitText = styled.Text`
  color: ${props => (props.disabled ? colors.grey : 'white')};
`

const SubmitButton = props => {
  const enabledBgColor = props.color || colors.primary
  const disabledBgColor = colors.greyLight
  const bgColor = props.disabled ? disabledBgColor : enabledBgColor

  return (
    <Container
      bgColor={bgColor}
      onPress={props.disabled ? null : props.onPress}
      style={{ ...props.style }}
    >
      <SubmitText>{props.title}</SubmitText>
    </Container>
  )
}

export default SubmitButton
