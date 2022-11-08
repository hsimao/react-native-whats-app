import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useActions } from '../store/hooks'
import { colors } from '../theme/colors'
import { fetchUser } from '../services/users/fetchUser'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const StartUpScreen = () => {
  const { setDidTryAutoLogin, authenticate } = useActions()

  // auto login
  useEffect(() => {
    const tryLogin = async () => {
      // check storage
      const storageUserData = await AsyncStorage.getItem('userData')
      if (!storageUserData) return setDidTryAutoLogin()

      // format storageUserData
      const parseUserData = JSON.parse(storageUserData)
      const { token, userId, expiryDate: expiryDateString } = parseUserData
      const expiryDate = new Date(expiryDateString)

      // 檢查是否過期, user 資料是否完整
      if (expiryDate <= new Date() || !token || !userId) {
        return setDidTryAutoLogin()
      }

      // 從 database 取得用戶資料
      const userData = await fetchUser(userId)

      // 有取得用戶資料就更新到 redux
      userData ? authenticate({ ...userData, token }) : setDidTryAutoLogin()
    }
    tryLogin()
  }, [])

  return (
    <Container>
      <ActivityIndicator size="large" color={colors.primary} />
    </Container>
  )
}

export default StartUpScreen
