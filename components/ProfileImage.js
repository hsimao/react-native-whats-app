import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { FontAwesome } from '@expo/vector-icons'
import { launchImagePicker } from '../utils/imagePicker'
import userImage from '../assets/images/userImage.jpeg'

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
  launchImagePicker()
  const pickImage = () => {
    console.log('pickImage')
  }

  return (
    <TouchableOpacity onPress={pickImage}>
      <Image source={userImage} size={props.size} />

      <EditIcon>
        <FontAwesome name="pencil" size={15} color="black" />
      </EditIcon>
    </TouchableOpacity>
  )
}

export default ProfileImage
