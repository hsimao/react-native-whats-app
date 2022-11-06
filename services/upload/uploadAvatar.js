import { storage } from '../firebase'
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage'

/**
 * 上傳照片到 firebase
 * @param {*} userId
 * @param {*} uri
 * @returns firebase storage url
 */
export const uploadAvatar = async (userId, uri) => {
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

  const pathFolder = 'avatar'
  const storageRef = ref(storage, `${pathFolder}/${userId}`)

  // upload to firebase
  await uploadBytesResumable(storageRef, blob)

  blob.close()

  return await getDownloadURL(storageRef)
}
