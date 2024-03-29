import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Platform,
  FlatList,
  Keyboard,
  View,
  Image,
  ActivityIndicator,
} from 'react-native'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { colors } from '../theme/colors'
import { useSelector } from 'react-redux'
import Bubble from '../components/Bubble'
import ReplyTo from '../components/ReplyTo'
import { createChat } from '../services/chat/createChat'
import {
  createMessage,
  createImageMessage,
} from '../services/message/createMessage'
import { launchImagePicker, openCamera } from '../utils/imagePicker'
import AwesomeAlert from 'react-native-awesome-alerts'
import { uploadChatImg } from '../services/upload'

const ChatScreen = ({ route, navigation }) => {
  const flatListRef = useRef(null)
  const [chatUsers, setChatUsers] = useState([])
  const [message, setMessage] = useState('')
  const [isMessageChange, setIsMessageChange] = useState(false)
  const [chatId, setChatId] = useState(route?.params?.chatId || '')
  const [errorBannerText, setErrorBannerText] = useState('')
  const [replyingTo, setReplyingTo] = useState()
  const [tempImageUri, setTempImageUri] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const tempUsers = useSelector(state => state.user.tempUsers)
  const selfUserData = useSelector(state => state.auth.userData)
  const chatsData = useSelector(state => state.chat.chatsData)
  const messageList = useSelector(state => {
    if (!chatId) return []

    const messageMap = state.message.messageMap[chatId]
    if (!messageMap) return []

    return Object.keys(messageMap)
      .map(key => ({
        ...messageMap[key],
        isMe: messageMap[key].sendBy === selfUserData.userId,
        id: key,
      }))
      .sort((a, b) => new Date(a.sendAt) - new Date(b.sendAt))
  })

  const messageLength = useMemo(() => messageList.length || 0, [messageList])
  // 監聽 messageLength, 更新 isMessageChange 狀態
  useEffect(() => {
    setIsMessageChange(true)
    const timer = setTimeout(() => setIsMessageChange(false), 500)
    return () => clearTimeout(timer)
  }, [messageLength])

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
    let currentChatId = chatId
    try {
      // 尚未建立聊天室
      if (!currentChatId) {
        currentChatId = await createChat(selfUserData.userId, chatData)
        setChatId(currentChatId)
      }

      // 儲存 message 到 db
      await createMessage(
        currentChatId,
        selfUserData.userId,
        message,
        replyingTo?.id
      )

      setReplyingTo(null)
      Keyboard.dismiss()
    } catch (error) {
      console.log(error)
      setErrorBannerText('Message failed to send')
      setTimeout(() => setErrorBannerText(''), 5000)
    }
    setMessage('')
  }, [chatId, message])

  const handleSendImageMessage = useCallback(
    async (currentChatId, imageUrl) => {
      try {
        // 儲存 image message 到 db
        await createImageMessage(
          currentChatId,
          selfUserData.userId,
          imageUrl,
          replyingTo?.id
        )
      } catch (error) {
        console.log(error)
        setErrorBannerText('Message failed to send')
        setTimeout(() => setErrorBannerText(''), 5000)
      }
    },
    [selfUserData, replyingTo]
  )

  const handleScrollToEnd = () =>
    isMessageChange && flatListRef.current.scrollToEnd({ animated: false })

  // 選照片
  const pickImage = useCallback(async () => {
    try {
      const tempUri = await launchImagePicker()
      if (!tempUri) return
      setTempImageUri(tempUri)
    } catch (error) {
      console.log(error)
    }
  }, [])

  // 拍照
  const takePhoto = useCallback(async () => {
    try {
      const tempUri = await openCamera()
      if (!tempUri) return
      setTempImageUri(tempUri)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const showAlertImage = useMemo(
    () => !isLoading && tempImageUri,
    [isLoading, tempImageUri]
  )

  // upldate image
  const uploadImage = useCallback(async () => {
    setIsLoading(true)
    let currentChatId = chatId

    try {
      // 尚未建立聊天室
      if (!currentChatId) {
        currentChatId = await createChat(selfUserData.userId, chatData)
        setChatId(currentChatId)
      }

      const url = await uploadChatImg(currentChatId, tempImageUri)
      await handleSendImageMessage(currentChatId, url)

      setIsLoading(false)
      setTempImageUri('')
      setReplyingTo(null)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }, [chatId, tempImageUri])

  return (
    <Container>
      <KeyboardAvoidingViewStyle>
        <ContentBgCover>
          {/* content */}
          <Content style={{ backgroundColor: 'transparent' }}>
            {!chatId && (
              <Bubble text="This is a new chat. Say hi!" type="system" />
            )}

            {/* error */}
            {errorBannerText && <Bubble text={errorBannerText} type="error" />}

            {/* message */}
            {!!messageList.length && (
              <FlatList
                ref={flatListRef}
                data={messageList}
                onLayout={handleScrollToEnd}
                onContentSizeChange={handleScrollToEnd}
                renderItem={itemData => {
                  const message = itemData.item
                  const messageType = message.isMe
                    ? 'myMessage'
                    : 'theirMessage'

                  const replyingTo =
                    message?.replyTo &&
                    messageList.find(item => item.id === message.replyTo)

                  return (
                    <Bubble
                      text={message.text}
                      type={messageType}
                      date={message.sendAt}
                      messageId={message.id}
                      imageUrl={message.imageUrl}
                      userId={selfUserData.userId}
                      chatId={chatId}
                      replyingTo={replyingTo}
                      setReply={() => setReplyingTo(message)}
                    />
                  )
                }}
              />
            )}
          </Content>

          {/* 回覆 */}
          {replyingTo && (
            <ReplyTo
              text={replyingTo.text}
              user={tempUsers[replyingTo.sendBy]}
              onCancel={() => setReplyingTo(null)}
            />
          )}
        </ContentBgCover>

        {/* Input */}
        <InputArea>
          <IconButtonWrapper onPress={() => pickImage()}>
            <Feather name="plus" size={24} color={colors.blue} />
          </IconButtonWrapper>

          <TextInputStyle
            value={message}
            onChangeText={text => onChangeText(text)}
            onSubmitEditing={() => handleSendMessage()}
          />

          {/* 當 input 尚未輸入文字, 顯示相機按鈕 */}
          {message === '' && (
            <IconButtonWrapper onPress={takePhoto}>
              <Feather name="camera" size={24} color={colors.blue} />
            </IconButtonWrapper>
          )}

          {/* 當 input 有輸入文字, 顯示 send 按鈕 */}
          {message !== '' && (
            <IconButtonWrapper round onPress={() => handleSendMessage()}>
              <Feather name="send" size={20} color={colors.white} />
            </IconButtonWrapper>
          )}

          <AwesomeAlert
            show={tempImageUri !== ''}
            title="Send image?"
            closeOnTouchOutside
            closeOnHardwareBackPress={false}
            showCancelButton
            showConfirmButton
            cancelText="Cancel"
            confirmText="Send image"
            confirmButtonColor={colors.primary}
            cancelButtonColor={colors.red}
            onConfirmPressed={uploadImage}
            onCancelPressed={() => setTempImageUri('')}
            onDismiss={() => setTempImageUri('')}
            customView={
              <View>
                {isLoading && (
                  <ActivityIndicator size="small" color={colors.primary} />
                )}

                {showAlertImage && (
                  <Image
                    source={{ uri: tempImageUri }}
                    style={{ width: 200, height: 200 }}
                  />
                )}
              </View>
            }
            titleStyle={{
              fontFamily: 'medium',
              letterSpacing: 0.3,
              color: colors.text.primary,
            }}
          />
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

const Content = styled.View`
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
