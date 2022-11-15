import { ref, set, child } from 'firebase/database'
import { db } from '../firebase'

export const createUser = async ({ firstName, lastName, email, userId }) => {
  const fullName = `${firstName} ${lastName}`.toLowerCase()
  const user = {
    firstName,
    lastName,
    fullName,
    email,
    userId,
    createdAt: new Date().toISOString(),
  }

  const dbRef = ref(db)
  const childRef = child(dbRef, `users/${userId}`)
  await set(childRef, user)

  return user
}
