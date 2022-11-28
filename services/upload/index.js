import { storage } from '../firebase'
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage'
import uuid from 'react-native-uuid'

/**
 * 上傳大頭貼到 firebase
 * @param {string} userId
 * @param {string} uri
 * @returns firebase storage url
 */
export const uploadAvatar = (userId, uri) => {
  const pathFolder = 'avatar'
  const path = `${pathFolder}/${userId}`
  return upload(path, uri)
}

/**
 * 上傳聊天室照片到 firebase
 * @param {string} chatId
 * @param {string} uri
 * @returns firebase storage url
 */
export const uploadChatImg = (chatId, uri) => {
  const pathFolder = 'chat'
  const path = `${pathFolder}/${chatId}/${uuid.v4()}`
  return upload(path, uri)
}

/**
 * 上傳照片到 firebase
 * @param {string} path
 * @param {string} uri
 * @returns firebase storage url
 */
export const upload = async (path, uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.onload = function () {
      resolve(xhr.response)
    }

    xhr.onerror = function (error) {
      console.log(error)
      reject(new TypeError('Network request failed'))
    }

    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send()
  })

  const storageRef = ref(storage, path)

  // upload to firebase
  await uploadBytesResumable(storageRef, blob)

  blob.close()

  return await getDownloadURL(storageRef)
}
