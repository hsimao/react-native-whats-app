import { ref, child, onValue, off } from 'firebase/database'
import { db } from '../firebase'

// 監聽聊天室訊息
export const onStarredMessages = (userId, callback) => {
  try {
    const dbRef = ref(db)
    const childRef = child(dbRef, `userStarredMessages/${userId}`)

    // 監聽
    onValue(childRef, callback)

    // 返回解除訂閱方法
    return () => off(childRef)
  } catch (error) {
    console.log(error)
    throw error
  }
}
