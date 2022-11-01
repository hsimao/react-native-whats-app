import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import userImage from '../assets/images/userImage.jpeg'

const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  border: solid 1px ${({ theme }) => theme.colors.grey};
  border-radius: 50%;
  width: ${props => (props.size ? `${props.size}px` : '80px')};
  height: ${props => (props.size ? `${props.size}px` : '80px')};
`

const ProfileImage = props => {
  return (
    <View>
      <Image source={userImage} size={props.size} />
    </View>
  )
}

export default ProfileImage
