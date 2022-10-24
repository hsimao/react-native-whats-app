import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const ChatListScreen = ({ navigation }) => {
  const handleToSetting = () => {
    navigation.navigate('ChatSettings')
  }

  return (
    <View style={styles.container}>
      <Text>Chat List screen</Text>
      <Button title="Go to settings" onPress={handleToSetting} />
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
