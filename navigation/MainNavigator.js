import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

// services
import { onUserChats } from '../services/chat/onUserChats'
import { onChat } from '../services/chat/onChat'

// store
import { useSelector } from 'react-redux'
import { useActions } from '../store/hooks'

// navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// icons
import { Ionicons } from '@expo/vector-icons'

// screens
import ChatListScreen from '../screens/ChatListScreen'
import ChatSettingsScreen from '../screens/ChatSettingsScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ChatScreen from '../screens/ChatScreen'
import NewChatScreen from '../screens/NewChatScreen'

// theme
import { colors } from '../theme/colors'

const LoadingWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

// Stack
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

// TabNavigator
// NOTE: 隱藏 header 底線 https://stackoverflow.com/questions/68921459/remove-headers-border-bottom-line-from-bottom-tab-navigator-react-navigation-v
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: '',
        headerStyle: {
          borderBottomColor: 'transparent',
          shadowColor: 'transparent',
          borderBottomWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerTitle: '',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="ChatSettings"
          component={ChatSettingsScreen}
          options={{
            headerBackTitle: 'Back',
          }}
        />
      </Stack.Group>

      {/* containedModal 彈窗效果 */}
      <Stack.Group screenOptions={{ presentation: 'containedModal' }}>
        <Stack.Screen name="NewChat" component={NewChatScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const MainNavigator = props => {
  const [isLoading, setIsLoading] = useState(true)
  const selfUserData = useSelector(state => state.auth.userData)

  const { setChatsData } = useActions()

  // Init 訂閱
  useEffect(() => {
    // 需解除訂閱列表
    const unsubscribeList = []
    // 聊天室資料 map
    const chatsData = {}
    let chatsFoundCount = 0

    // 監聽 user 聊天列表
    console.log('Subscribing listeners')
    const unsubscribeUserChats = onUserChats(selfUserData.userId, snapshot => {
      const chatIds = Object.values(snapshot.val() || {})

      // 監聽聊天室
      chatIds.forEach(chatId => {
        const unsubscribeChat = onChat(chatId, chatSnapshot => {
          chatsFoundCount++

          // update chatsData
          const data = chatSnapshot.val()
          if (data) {
            data.key = chatSnapshot.key
            chatsData[data.key] = data
          }

          // chatsData 儲存到 store
          if (chatsFoundCount >= chatIds.length) {
            setChatsData(chatsData)
            setIsLoading(false)
          }

          // 未有列表
          if (chatsFoundCount === 0) setIsLoading(false)
        })
        unsubscribeList.push(unsubscribeChat)
      })
    })
    unsubscribeList.push(unsubscribeUserChats)

    // 解除訂閱
    return () => {
      unsubscribeList.forEach(unsubscribe => unsubscribe())
      console.log('Unsubscribing listeners')
    }
  }, [])

  // loading
  if (isLoading) {
    return (
      <LoadingWrapper>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </LoadingWrapper>
    )
  }

  return <StackNavigator />
}

export default MainNavigator
