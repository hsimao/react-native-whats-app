import { ref, child, get, set, remove } from 'firebase/database'
import { db } from '../firebase'

export const starMessage = async (messageId, chatId, userId) => {
  try {
    const dbRef = ref(db)

    const childRef = child(
      dbRef,
      `userStarredMessages/${userId}/${chatId}/${messageId}`
    )

    const snapshot = await get(childRef)

    // 已經 star, 解除 start
    if (snapshot.exists()) {
      await remove(childRef)
      // 尚未 star, 加入 star
    } else {
      await set(childRef, {
        messageId,
        chatId,
        starredAt: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
