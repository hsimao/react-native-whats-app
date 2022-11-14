import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Platform, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { colors } from '../theme/colors'
import { useSelector } from 'react-redux'
import PageContainer from '../components/PageContainer'
import Bubble from '../components/Bubble'
import { createChat } from '../services/chat/createChat'
import { createMessage } from '../services/message/createMessage'

const ChatScreen = ({ route, navigation }) => {
  const [chatUsers, setChatUsers] = useState([])
  const [message, setMessage] = useState('')
  const [chatId, setChatId] = useState(route?.params?.chatId)
  const [errorBannerText, setErrorBannerText] = useState('')

  const tempUsers = useSelector(state => state.user.tempUsers)
  const selfUserData = useSelector(state => state.auth.userData)
  const chatsData = useSelector(state => state.chat.chatsData)
  const messageList = useSelector(state => {
    if (!chatId) return []
    const messageMap = state.message.messageMap[chatId]

    return Object.keys(messageMap)
      .map(key => ({
        ...messageMap[key],
        isMe: messageMap[key].sendBy === selfUserData.userId,
        id: key,
      }))
      .sort((a, b) => new Date(a.sendAt) - new Date(b.sendAt))
  })

  // 當前聊天室資料
  const chatData = useMemo(() => {
    if (chatId && chatsData[chatId]) return chatsData[chatId]
    return route?.params?.newChatData
  }, [route.params, chatData, chatsData])

  useEffect(() => {
    chatData && setChatUsers(chatData.users)
  }, [chatUsers])

  const getChatTitle = useMemo(() => {
    const otherUserId = chatUsers.find(uid => uid !== selfUserData.userId)
    const otherUserData = tempUsers[otherUserId]
    return otherUserData
      ? `${otherUserData.firstName} ${otherUserData.lastName}`
      : ''
  }, [selfUserData, chatUsers])

  // update header title
  useEffect(() => {
    navigation.setOptions({ headerTitle: getChatTitle })
  }, [getChatTitle])

  const onChangeText = text => setMessage(text)

  const handleSendMessage = useCallback(async () => {
    try {
      // 尚未建立聊天室
      if (!chatId) {
        const newChatId = await createChat(selfUserData.userId, chatData)
        setChatId(newChatId)
      }

      // 儲存 message 到 db
      await createMessage(chatId, selfUserData.userId, message)
    } catch (error) {
      console.log(error)
      setErrorBannerText('Message failed to send')
      setTimeout(() => setErrorBannerText(''), 5000)
    }
    setMessage('')
  }, [message])

  return (
    <Container>
      <KeyboardAvoidingViewStyle>
        <ContentBgCover>
          {/* content */}
          <PageContainer style={{ backgroundColor: 'transparent' }}>
            {!chatId && (
              <Bubble text="This is a new chat. Say hi!" type="system" />
            )}

            {/* error */}
            {errorBannerText && <Bubble text={errorBannerText} type="error" />}

            {/* message */}
            {messageList.length && (
              <FlatList
                data={messageList}
                renderItem={itemData => {
                  const message = itemData.item
                  const messageType = message.isMe
                    ? 'myMessage'
                    : 'theirMessage'

                  return <Bubble text={message.text} type={messageType} />
                }}
              />
            )}
          </PageContainer>
        </ContentBgCover>

        {/* Input */}
        <InputArea>
          <IconButtonWrapper>
            <Feather name="plus" size={24} color={colors.blue} />
          </IconButtonWrapper>

          <TextInputStyle
            value={message}
            onChangeText={text => onChangeText(text)}
            onSubmitEditing={() => handleSendMessage()}
          />

          {/* 當 input 尚未輸入文字, 顯示相機按鈕 */}
          {message === '' && (
            <IconButtonWrapper>
              <Feather name="camera" size={24} color={colors.blue} />
            </IconButtonWrapper>
          )}

          {/* 當 input 有輸入文字, 顯示 send 按鈕 */}
          {message !== '' && (
            <IconButtonWrapper round onPress={() => handleSendMessage()}>
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
