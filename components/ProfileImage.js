import React, { useState, useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { FontAwesome } from '@expo/vector-icons'
import { launchImagePicker } from '../utils/imagePicker'
import userImage from '../assets/images/userImage.jpeg'
import { uploadAvatar } from '../services/upload/uploadAvatar'
import { updateUser } from '../services/users/updateUser'

const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  border: solid 1px ${({ theme }) => theme.colors.grey};
  border-radius: ${props => (props.size ? `${props.size / 2}px` : '40px')};
  width: ${props => (props.size ? `${props.size}px` : '80px')};
  height: ${props => (props.size ? `${props.size}px` : '80px')};
`

const EditIcon = styled.View`
  position: absolute;
  bottom: -3px;
  right: -3px;
  background-color: ${props => props.theme.colors.greyLight};
  border-radius: 100px;
  padding: 8px;
`

const ProfileImage = props => {
  const { userId, updateUserData, uri, size } = props

  // default image
  const source = uri ? { uri } : userImage
  const [image, setImage] = useState(source)

  const pickImage = useCallback(async () => {
    try {
      const tempUri = await launchImagePicker()
      if (!tempUri) return

      // upload image to firebase storage
      const uploadUrl = await uploadAvatar(userId, tempUri)
      if (!uploadUrl) {
        throw new Error('Could not upload image')
      }

      // image url save to firebase database
      await updateUser(userId, { avatar: uploadUrl })

      // update new avatar to redux store
      if (updateUserData) updateUserData({ avatar: uploadUrl })

      setImage({ uri: uploadUrl })
    } catch (error) {
      console.log(error)
    }
  }, [userId, updateUserData])

  return (
    <TouchableOpacity onPress={pickImage}>
      <Image source={image} size={size} />

      <EditIcon>
        <FontAwesome name="pencil" size={15} color="black" />
      </EditIcon>
    </TouchableOpacity>
  )
}

export default ProfileImage
