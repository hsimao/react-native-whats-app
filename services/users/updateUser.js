import { ref, update, child } from 'firebase/database'
import { db } from '../firebase'

export const updateUser = async (userId, userData) => {
  try {
    const fullName = `${userData.firstName} ${userData.lastName}`.toLowerCase()
    userData.fullName = fullName

    const dbRef = ref(db)
    const userRef = child(dbRef, `users/${userId}`)
    await update(userRef, userData)
  } catch (error) {
    console.log(error)
  }
}
