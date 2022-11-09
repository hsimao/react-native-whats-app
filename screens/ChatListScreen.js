import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButtons'

const ChatListScreen = ({ navigation, route }) => {
  const userData = useSelector(state => state.auth.userData)
  const selectedUserId = route?.params?.selectedUserId
  // 若有 selectedUserId 則跳轉到聊天頁面
  useEffect(() => {
    if (!selectedUserId) return
    const chatUsers = [selectedUserId, userData.userId]

    const navigationProps = {
      newChatData: { users: chatUsers },
    }

    navigation.navigate('ChatScreen', navigationProps)
  }, [route?.params])

  const handleToSetting = () => navigation.navigate('ChatScreen')
  const handleToNewChat = () => navigation.navigate('NewChat')

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
    <View style={styles.container}>
      <Text>Chat List screen</Text>
      <Button title="Go to Chat Screen" onPress={handleToSetting} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ChatListScreen
