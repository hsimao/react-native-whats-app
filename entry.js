// 修復 React18 ReactDOM.render 報錯提示, 自定義 main entry.js 入口
// https://github.com/expo/expo/issues/18485

import 'expo/build/Expo.fx'
import { AppRegistry, Platform } from 'react-native'
import withExpoRoot from 'expo/build/launch/withExpoRoot'

import App from './App'
import { createRoot } from 'react-dom/client'

AppRegistry.registerComponent('main', () => withExpoRoot(App))
if (Platform.OS === 'web') {
  const rootTag = createRoot(
    document.getElementById('root') ?? document.getElementById('main')
  )
  const RootComponent = withExpoRoot(App)
  rootTag.render(<RootComponent />)
}
