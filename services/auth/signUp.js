import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { createUser } from '../users/createUser'
import { saveUserDataToStorage } from './utils'

export const signUp = async ({ firstName, lastName, email, password }) => {
  try {
    // create auth user
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const { uid, stsTokenManager } = result.user
    const { accessToken, expirationTime } = stsTokenManager

    const formatExpiryDate = new Date(expirationTime)
    const timeNow = new Date()
    // 到期時間, 毫秒單位
    const millisecondsUntilExpiry = formatExpiryDate - timeNow

    // save user to database
    const userData = await createUser({
      firstName,
      lastName,
      email,
      userId: uid,
    })

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
      error.code === 'auth/email-already-in-use'
        ? 'This email is already in use'
        : 'Something went wrong.'

    throw new Error(message)
  }
}
