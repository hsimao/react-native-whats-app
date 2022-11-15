import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import ProfileImage from './ProfileImage'

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 7px 0;
  border-color: ${props => props.theme.colors.greyExtraLight};
  border-bottom-width: 1px;
  min-height: 50px;
`

const TextContent = styled.View`
  margin-left: 14px;
`

const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: medium;
  font-size: 16px;
  letter-spacing: 0.3px;
`

const Subtitle = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: regular;
  color: ${props => props.theme.colors.grey};
  letter-spacing: 0.3px;
`

const UserItem = ({ title, subtitle, avatar, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        <ProfileImage uri={avatar} size={40} />

        <TextContent>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </TextContent>
      </Container>
    </TouchableWithoutFeedback>
  )
}

export default UserItem
