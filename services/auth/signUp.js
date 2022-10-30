import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { createUser } from '../users/createUser'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const signUp = async ({ firstName, lastName, email, password }) => {
  try {
    // create auth user
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const { uid, stsTokenManager } = result.user
    const { accessToken, expirationTime } = stsTokenManager

    const formatExpiryDate = new Date(expirationTime)

    // save user to database
    const userData = await createUser({
      firstName,
      lastName,
      email,
      userId: uid,
    })

    // save user data 到用戶裝置
    saveDataToStorage({
      token: accessToken,
      userId: uid,
      expiryDate: formatExpiryDate,
    })

    return { ...userData, token: accessToken }
  } catch (error) {
    console.error(error)
    // errorCode https://firebase.google.com/docs/auth/admin/errors
    const message =
      error.code === 'auth/email-already-in-use'
        ? 'This email is already in use'
        : 'Something went wrong.'

    throw new Error(message)
  }
}

// 儲存 userData 到用戶裝置
const saveDataToStorage = ({ token, userId, expiryDate }) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expiryDate.toISOString(),
    })
  )
}
