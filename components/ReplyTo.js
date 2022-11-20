import { Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '../theme/colors'

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.greyExtraLight};
  padding: 8px;
  border-left-color: ${({ theme }) => theme.colors.blue};
  border-left-width: 4px;
`

const TextContent = styled.View`
  flex: 1;
  margin-right: 5px;
`

const TextName = styled.Text`
  color: ${({ theme }) => theme.colors.blue};
  font-family: medium;
  letter-spacing: 0.3px;
`

const ReplyTo = ({ text, user, onCancel }) => {
  const name = `${user.firstName} ${user.lastName}`

  return (
    <Container>
      <TextContent>
        <TextName numberOfLines={1}>{name}</TextName>
        <Text numberOfLines={1}>{text}</Text>
      </TextContent>

      <TouchableOpacity onPress={onCancel}>
        <AntDesign name="closecircleo" size={24} color={colors.blue} />
      </TouchableOpacity>
    </Container>
  )
}

export default ReplyTo
