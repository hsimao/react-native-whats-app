import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function App() {
  const handleClick = () => {
    console.log('click')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />

      <Button title="Click me" onPress={handleClick} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  label: {
    fontSize: 18,
  },
})
