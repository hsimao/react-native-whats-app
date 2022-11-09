import React, { useState, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import { FontAwesome } from '@expo/vector-icons'
import { launchImagePicker } from '../utils/imagePicker'
import userImage from '../assets/images/userImage.jpeg'
import { uploadAvatar } from '../services/upload/uploadAvatar'
import { updateUser } from '../services/users/updateUser'
import { colors } from '../theme/colors'

const ImageContainer = styled.View`
  width: ${props => (props.size ? `${props.size}px` : '80px')};
  height: ${props => (props.size ? `${props.size}px` : '80px')};
  justify-content: center;
  align-items: center;
`
const Loading = styled.ActivityIndicator.attrs({
  color: colors.primary,
  size: 'small',
})`
  z-index: 1000;
  position: absolute;
`

const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  opacity: ${props => (props.isLoading ? '0' : '1')};
  border: solid 1px ${({ theme }) => theme.colors.grey};
  border-radius: ${props => (props.size ? `${props.size / 2}px` : '40px')};
  width: 100%;
  height: 100%;
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
  const { userId, updateUserData, uri, size, edit } = props

  const [isLoading, setIsLoading] = useState(false)

  const showEdit = useMemo(() => edit && !isLoading, [edit, isLoading])

  // default image
  const source = uri ? { uri } : userImage
  const [image, setImage] = useState(source)

  const pickImage = async () => {
    if (isLoading || !edit) return

    try {
      const tempUri = await launchImagePicker()
      if (!tempUri) return

      setIsLoading(true)

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
    } finally {
      setIsLoading(false)
    }
  }

  const Contaienr = edit ? TouchableOpacity : View

  return (
    <Contaienr onPress={pickImage}>
      <ImageContainer size={size}>
        <Image
          source={image}
          isLoading={isLoading}
          size={size}
          onLoadEnd={() => setIsLoading(false)}
        />
        {isLoading ? (
          <Loading
            style={{ zIndex: 1000 }}
            size={'small'}
            color={colors.primary}
          />
        ) : null}
      </ImageContainer>

      {showEdit && (
        <EditIcon>
          <FontAwesome name="pencil" size={15} color="black" />
        </EditIcon>
      )}
    </Contaienr>
  )
}

export default ProfileImage
