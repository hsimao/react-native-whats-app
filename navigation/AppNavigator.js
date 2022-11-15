import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './MainNavigator'
import AuthScreen from '../screens/AuthScreen'
import StartUpScreen from '../screens/StartUpScreen'
import { useSelector } from 'react-redux'

const AppNavigator = props => {
  const isAuth = useSelector(state => Boolean(state.auth.token))
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin)

  return (
    <NavigationContainer>
      {/* 已經登入 */}
      {isAuth && <MainNavigator />}

      {/* 尚未登入, 也已經嘗試過自動登入 */}
      {!isAuth && didTryAutoLogin && <AuthScreen />}

      {/* 尚未登入, 還沒執行過自動登入 */}
      {!isAuth && !didTryAutoLogin && <StartUpScreen />}
    </NavigationContainer>
  )
}

export default AppNavigator
