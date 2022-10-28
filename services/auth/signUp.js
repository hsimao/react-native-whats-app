import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { createUser } from '../users/createUser'

export const signUp = async ({ firstName, lastName, email, password }) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const { uid, stsTokenManager } = result.user
    const { accessToken } = stsTokenManager

    const userData = await createUser({
      firstName,
      lastName,
      email,
      userId: uid,
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
