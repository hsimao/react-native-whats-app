import {
  ref,
  query,
  get,
  child,
  orderByChild,
  startAt,
  endAt,
} from 'firebase/database'
import { db } from '../firebase'

export const fetchUsers = async searchText => {
  const formatSearchText = searchText.toLowerCase()
  console.log('fetchUsers')
  try {
    const dbRef = ref(db)
    const usersRef = child(dbRef, 'users')

    const queryRef = query(
      usersRef,
      orderByChild('fullName'),
      startAt(formatSearchText),
      endAt(formatSearchText + '\uf8ff')
    )

    const snapshot = await get(queryRef)
    return snapshot.exists() ? snapshot.val() : {}
  } catch (error) {
    console.log(error)
    throw error
  }
}
