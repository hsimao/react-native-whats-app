import React from 'react'

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

const MainNavigator = props => {
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

export default MainNavigator
