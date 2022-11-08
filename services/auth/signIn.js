import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { fetchUser } from '../users/fetchUser'
import { saveUserDataToStorage } from './utils'

export const signIn = async ({ email, password }) => {
  try {
    // signin
    const result = await signInWithEmailAndPassword(auth, email, password)
    const { uid, stsTokenManager } = result.user
    const { accessToken, expirationTime } = stsTokenManager

    const formatExpiryDate = new Date(expirationTime)
    const timeNow = new Date()
    // 到期時間, 毫秒單位
    const millisecondsUntilExpiry = formatExpiryDate - timeNow

    // 從 database 取得用戶資料
    const userData = await fetchUser(uid)

    // save user data 到用戶裝置
    saveUserDataToStorage({
      token: accessToken,
      userId: uid,
      expiryDate: formatExpiryDate,
    })

    return { ...userData, token: accessToken, millisecondsUntilExpiry }
  } catch (error) {
    console.error(error)
    // errorCode https://firebase.google.com/docs/auth/admin/errors
    const message =
      error.code === 'auth/user-not-found' ||
      error.code === 'auth/wrong-password'
        ? 'The email or password was incorrect'
        : 'Something went wrong.'

    throw new Error(message)
  }
}
