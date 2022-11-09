import React, { useState, useCallback } from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { colors } from '../theme/colors'

const ChatScreen = props => {
  const [message, setMessage] = useState('')

  const chatData = props.route?.params?.newChatData
  console.log('chatData', chatData)

  const onChangeText = text => setMessage(text)

  const handleSendMessage = useCallback(() => {
    setMessage('')
  }, [message])

  return (
    <Container>
      <KeyboardAvoidingViewStyle>
        <ContentBgCover></ContentBgCover>

        <InputArea>
          <IconButtonWrapper>
            <Feather name="plus" size={24} color={colors.blue} />
          </IconButtonWrapper>

          <TextInputStyle
            value={message}
            onChangeText={onChangeText}
            onSubmitEditing={handleSendMessage}
          />

          {/* 當 input 尚未輸入文字, 顯示相機按鈕 */}
          {message === '' && (
            <IconButtonWrapper>
              <Feather name="camera" size={24} color={colors.blue} />
            </IconButtonWrapper>
          )}

          {/* 當 input 有輸入文字, 顯示 send 按鈕 */}
          {message !== '' && (
            <IconButtonWrapper round onPress={handleSendMessage}>
              <Feather name="send" size={20} color={colors.white} />
            </IconButtonWrapper>
          )}
        </InputArea>
      </KeyboardAvoidingViewStyle>
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

// IOS keyboard 顯示時, 將內容向上推效果
const KeyboardAvoidingViewStyle = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  keyboardVerticalOffset: 100,
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

  ${({ round, theme }) =>
    round
      ? `
  background-color: ${theme.colors.blue};
  padding: 8px;
  border-radius: 50px;
  `
      : ''}
`

export default ChatScreen
