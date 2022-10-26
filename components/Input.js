import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { colors } from '../theme/colors'

const Container = styled.View`
  width: 100%;
`

const Label = styled.Text`
  margin: 8px 0;
  font-family: 'bold';
  letter-spacing: 0.3px;
  color: ${({ theme }) => theme.colors.text.primary};
`

const InputWrapper = styled.View`
  flex-flow: row nowrap;
  width: 100%;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.whiteDark};
  padding: 0 10px;
  border-radius: 2px;
`

const EnterInput = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: 'regular';
  letter-spacing: 0.3px;
  padding: 15px 0;
`

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    color: colors.grey,
  },
})

const ErrorWrapper = styled.View`
  margin: 5px 0;
`

const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.text.error};
  font-size: 13px;
  font-family: 'regular';
  letter-spacing: 0.3px;
`

const Input = props => {
  const handleChange = text => {
    props.onInputChange(props.id, text)
  }
  return (
    <Container>
      {/* label */}
      {props.label ? <Label>{props.label}</Label> : null}

      {/* Input Area */}
      <InputWrapper>
        {/* Icon */}
        {props.icon && (
          <props.iconPack
            name={props.icon}
            size={props.iconSize || 15}
            style={styles.icon}
          />
        )}

        {/* Input */}
        <EnterInput {...props} onChangeText={handleChange} />
      </InputWrapper>

      {/* Error message */}
      {props.errorText && (
        <ErrorWrapper>
          <ErrorText>{props.errorText}</ErrorText>
        </ErrorWrapper>
      )}
    </Container>
  )
}

export default Input
