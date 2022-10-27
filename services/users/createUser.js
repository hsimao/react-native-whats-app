import { getDatabase, ref, set, child } from 'firebase/database'

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

  const dbRef = ref(getDatabase())
  const childRef = child(dbRef, `users/${userId}`)
  await set(childRef, user)

  return user
}
