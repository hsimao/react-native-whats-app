import React from 'react'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { colors } from '../theme/colors'

const ChatScreen = props => {
  return (
    <Container>
      <ContentBgCover></ContentBgCover>

      <InputArea>
        <IconButtonWrapper>
          <Feather name="plus" size={24} color={colors.primary} />
        </IconButtonWrapper>
        <TextInputStyle />
        <IconButtonWrapper>
          <Feather name="camera" size={24} color={colors.primary} />
        </IconButtonWrapper>
      </InputArea>
    </Container>
  )
}

const Container = styled(SafeAreaView).attrs({
  edges: ['right', 'left', 'bottom'],
})`
  flex: 1;
  flex-direction: column;
`

const ContentBgCover = styled.ImageBackground.attrs({
  source: require('../assets/images/chat-bg.jpeg'),
})`
  flex: 1;
`

const InputArea = styled.View`
  flex-direction: row;
  padding: 8px 10px;
  height: 50px;
`

const TextInputStyle = styled.TextInput`
  flex: 1;
  border: solid 1px ${({ theme }) => theme.colors.greyLight};
  border-radius: 50px;
  margin: 0 15px;
  padding: 0 12px;
`

const IconButtonWrapper = styled.TouchableOpacity`
  width: 35px;
  align-items: center;
  justify-content: center;
`

export default ChatScreen
