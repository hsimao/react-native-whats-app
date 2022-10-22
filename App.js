import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState, useCallback } from 'react'

// 維持啟動畫面
SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false)

  // load fonts
  useEffect(() => {
    setTimeout(() => {
      console.warn('iohe hello')
      setAppIsLoaded(true)
    }, 3000)
  })

  // 關閉啟動畫面
  const onLayout = useCallback(async () => {
    if (appIsLoaded) await SplashScreen.hideAsync()
  }, [appIsLoaded])

  // 未完成加載前不渲染任何樣式
  if (!appIsLoaded) return null

  return (
    <SafeAreaProvider style={styles.container} onLayout={onLayout}>
      <SafeAreaView>
        <Text style={styles.label}>
          Open up App.js to start working on your app!
        </Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
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
