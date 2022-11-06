import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButtons'

const NewChatScreen = ({ navigation }) => {
  const handleClose = () => navigation.goBack()

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Close" onPress={handleClose} />
          </HeaderButtons>
        )
      },
      headerTitle: 'New chat',
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text>New Chat screen</Text>
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

export default NewChatScreen
