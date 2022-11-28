import { ref, child, push } from 'firebase/database'
import { db } from '../firebase'
import { updateChat } from '../chat/updateChat'

// 發送訊息
export const createMessage = async (chatId, senderId, messageText, replyTo) => {
  const messageData = {
    sendBy: senderId,
    sendAt: new Date().toISOString(),
    text: messageText,
  }
  if (replyTo) messageData.replyTo = replyTo

  const dbRef = ref(db)
  const messageRef = child(dbRef, `messages/${chatId}`)

  await push(messageRef, messageData)

  // 更新聊天室
  updateChat(chatId, senderId, messageText)
}

// 發送圖片
export const createImageMessage = async (
  chatId,
  senderId,
  imageUrl,
  replyTo
) => {
  const messageData = {
    sendBy: senderId,
    sendAt: new Date().toISOString(),
    text: 'Image',
    imageUrl,
  }
  if (replyTo) messageData.replyTo = replyTo

  const dbRef = ref(db)
  const messageRef = child(dbRef, `messages/${chatId}`)

  await push(messageRef, messageData)

  // 更新聊天室
  updateChat(chatId, senderId, 'Image')
}
