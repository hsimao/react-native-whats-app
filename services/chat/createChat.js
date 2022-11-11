import { ref, child, push } from 'firebase/database'
import { db } from '../firebase'

// 建立聊天室
export const createChat = async (loggedInUserId, chatData) => {
  const newChatData = {
    ...chatData,
    createdBy: loggedInUserId,
    updatedBy: loggedInUserId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  // 新增聊天室
  const dbRef = ref(db)
  const newChat = await push(child(dbRef, 'chats'), newChatData)

  // 聊天室關聯到所有用戶
  const chatUsers = newChatData.users
  for (let i = 0; i < chatUsers.length; i++) {
    await push(child(dbRef, `userChats/${chatUsers[i]}`), newChat.key)
  }

  return newChat.key
}
