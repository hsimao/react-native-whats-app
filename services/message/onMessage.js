import { ref, child, onValue, off } from 'firebase/database'
import { db } from '../firebase'

// 監聽聊天室訊息
export const onMessage = (chatId, callback) => {
  try {
    const dbRef = ref(db)
    const messageRef = child(dbRef, `messages/${chatId}`)

    // 監聽
    onValue(messageRef, callback)

    // 返回解除訂閱方法
    return () => off(messageRef)
  } catch (error) {
    console.log(error)
    throw error
  }
}
