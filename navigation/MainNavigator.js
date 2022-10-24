import React from 'react'

// navigation
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// icons
import { Ionicons } from '@expo/vector-icons'

// screens
import ChatListScreen from '../screens/ChatListScreen'
import ChatSettingsScreen from '../screens/ChatSettingsScreen'
import SettingsScreen from '../screens/SettingsScreen'

// Stack
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// TabNavigator
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerTitle: '' }}>
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
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatSettings"
        component={ChatSettingsScreen}
        options={{
          headerTitle: 'Settings',
        }}
      />
    </Stack.Navigator>
  )
}

export default MainNavigator
