import { getFirebaseApp } from '../../firebase'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

export const signUp = async ({ firstName, lastName, email, password }) => {
  try {
    const app = getFirebaseApp()
    const auth = getAuth(app)
    const result = await createUserWithEmailAndPassword(auth, email, password)
    console.log('result', result)
  } catch (error) {
    // errorCode https://firebase.google.com/docs/auth/admin/errors
    const message =
      error.code === 'auth/email-already-in-use'
        ? 'This email is already in use'
        : 'Something went wrong.'

    throw new Error(message)
  }
}
