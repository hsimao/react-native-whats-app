import * as ImagePicker from 'expo-image-picker'
import { Platform } from 'react-native'

export const launchImagePicker = async () => {
  await checkMediaPermissions()

  const result = await ImagePicker.launchImageLibraryAsync({
    // 只要求訪問照片權限
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    // 允許編輯
    allowsEditing: true,
    // 寬高比
    aspect: [1, 1],
    // 質量, 預設 0.2
    quality: 0.2,
  })

  if (!result.cancelled) {
    return result.uri
  }
}

// 檢查媒體庫訪問權限
const checkMediaPermissions = async () => {
  if (Platform.OS !== 'web') {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted)
      return Promise.reject('We need permission to access your photos')
  }

  return Promise.resolve()
}

export const openCamera = async () => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
  if (!permissionResult.granted) {
    console.log('No permission to access the camera')
    return
  }

  const result = await ImagePicker.launchCameraAsync({
    // 只要求訪問照片權限
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    // 允許編輯
    allowsEditing: true,
    // 寬高比
    aspect: [1, 1],
    // 質量, 預設 0.2
    quality: 0.2,
  })

  if (!result.cancelled) {
    return result.uri
  }
}
