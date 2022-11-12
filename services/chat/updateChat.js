import { ref, child, update } from 'firebase/database'
import { db } from '../firebase'

// 更新聊天室
export const updateChat = async (chatId, senderId, message) => {
  const dbRef = ref(db)
  const chatRef = child(dbRef, `chats/${chatId}`)

  await update(chatRef, {
    updatedBy: senderId,
    updatedAt: new Date().toISOString(),
    // 聊天室當前最新訊息
    latestMessage: message,
  })
}
