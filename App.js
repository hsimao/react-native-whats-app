import 'react-native-gesture-handler'
import { StyleSheet, LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components/native'
import { theme } from './theme'
import { useEffect, useState } from 'react'
import * as React from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { Provider } from 'react-redux'
import { store } from './store/store'

import AppNavigator from './navigation/AppNavigator'

// FIX: 修復 Reload SplashScreen 報錯 https://github.com/expo/expo/issues/14824
LogBox.ignoreLogs(['SplashScreen.show', 'AsyncStorage has been extracted'])

// 維持啟動畫面
SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false)

  // load fonts
  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          black: require('./assets/fonts//Roboto-Black.ttf'),
          blackItalic: require('./assets/fonts/Roboto-BlackItalic.ttf'),
          bold: require('./assets/fonts/Roboto-Bold.ttf'),
          boldItalic: require('./assets/fonts/Roboto-BoldItalic.ttf'),
          italic: require('./assets/fonts/Roboto-Italic.ttf'),
          light: require('./assets/fonts/Roboto-Light.ttf'),
          lightItalic: require('./assets/fonts/Roboto-LightItalic.ttf'),
          medium: require('./assets/fonts/Roboto-Medium.ttf'),
          mediumItalic: require('./assets/fonts/Roboto-MediumItalic.ttf'),
          regular: require('./assets/fonts/Roboto-Regular.ttf'),
          thin: require('./assets/fonts/Roboto-Thin.ttf'),
          thinItalic: require('./assets/fonts/Roboto-ThinItalic.ttf'),
        })
      } catch (error) {
        console.log(error)
      } finally {
        setAppIsLoaded(true)
      }
    }

    prepare()
  }, [])

  // 關閉啟動畫面
  const hideSplashScreen = () => SplashScreen.hideAsync()

  // 未完成加載前不渲染任何樣式
  if (!appIsLoaded) return null

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider style={styles.container} onLayout={hideSplashScreen}>
          <AppNavigator />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontFamily: 'regular',
  },
})
