import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButtons'

const ChatListScreen = ({ navigation }) => {
  const handleToSetting = () => {
    navigation.navigate('ChatScreen')
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="New chat"
              iconName="create-outline"
              onPress={() => {}}
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
