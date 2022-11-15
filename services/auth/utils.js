import AsyncStorage from '@react-native-async-storage/async-storage'

// 儲存 userData 到用戶裝置
export const saveUserDataToStorage = ({ token, userId, expiryDate }) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expiryDate.toISOString(),
    })
  )
}
