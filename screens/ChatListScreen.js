import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButtons'
import PageContainer from '../components/PageContainer'
import PageTitle from '../components/PageTitle'
import UserItem from '../components/UserItem'

const ChatListScreen = ({ navigation, route }) => {
  // 當前用戶所有聊天列表資料
  const userChats = useSelector(state =>
    Object.values(state.chat.chatsData).sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    )
  )
  const selfUserData = useSelector(state => state.auth.userData)
  const tempUsers = useSelector(state => state.user.tempUsers)

  const selectedUserId = route?.params?.selectedUserId
  // 若有 selectedUserId 則跳轉到聊天頁面
  useEffect(() => {
    if (!selectedUserId) return
    const chatUsers = [selectedUserId, selfUserData.userId]

    const navigationProps = {
      newChatData: { users: chatUsers },
    }

    navigation.navigate('ChatScreen', navigationProps)
  }, [route?.params])

  const handleToNewChat = () => navigation.navigate('NewChat')

  const handleToChatScreen = chatId =>
    navigation.navigate('ChatScreen', { chatId })

  // Init navigation header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="New chat"
              iconName="create-outline"
              onPress={handleToNewChat}
            />
          </HeaderButtons>
        )
      },
    })
  }, [])

  return (
    <PageContainer>
      <PageTitle>Chats</PageTitle>

      <FlatList
        data={userChats}
        renderItem={itemData => {
          const { users, key: chatId, latestMessage } = itemData.item
          const displayUserId = users.find(uid => uid !== selfUserData.userId)
          const displayUser = tempUsers[displayUserId]
          if (!displayUser) return

          return (
            <UserItem
              title={displayUser.firstName}
              subtitle={latestMessage || 'New chat'}
              avatar={displayUser.avatar}
              onPress={() => handleToChatScreen(chatId)}
            />
          )
        }}
      />
    </PageContainer>
  )
}

export default ChatListScreen
