import { ref, child, onValue, off } from 'firebase/database'
import { db } from '../firebase'

// 監聽聊天室列表
export const onUserChats = (userId, callback) => {
  try {
    const dbRef = ref(db)
    const userChatsRef = child(dbRef, `userChats/${userId}`)
    // 監聽 user chats 異動
    onValue(userChatsRef, callback)

    // 返回解除訂閱方法
    return () => off(userChatsRef)
  } catch (error) {
    console.log(error)
    throw error
  }
}
