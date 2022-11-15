import { ref, child, onValue, off } from 'firebase/database'
import { db } from '../firebase'

// 監聽聊天室
export const onChat = (chatId, callback) => {
  try {
    const dbRef = ref(db)
    const chatRef = child(dbRef, `chats/${chatId}`)

    // 監聽
    onValue(chatRef, callback)

    // 返回解除訂閱方法
    return () => off(chatRef)
  } catch (error) {
    console.log(error)
    throw error
  }
}
