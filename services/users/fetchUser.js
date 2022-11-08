import { ref, get, child } from 'firebase/database'
import { db } from '../firebase'

export const fetchUser = async userId => {
  try {
    const dbRef = ref(db)
    const userRef = child(dbRef, `users/${userId}`)
    const snapshot = await get(userRef)
    return snapshot.val()
  } catch (error) {
    console.log(error)
  }
}
