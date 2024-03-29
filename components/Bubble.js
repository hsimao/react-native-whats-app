import React, { useRef, useMemo, useEffect } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../theme/colors'
import { Menu, MenuTrigger, MenuOptions } from 'react-native-popup-menu'
import uuid from 'react-native-uuid'
import * as Clipboard from 'expo-clipboard'
import BubbleMenuItem from './BubbleMenuItem'
import { FontAwesome, Octicons } from '@expo/vector-icons'
import { starMessage } from '../services/message/starMessage'
import { useSelector } from 'react-redux'
import { formatAmPm } from '../utils/time'

const Container = styled.View`
  flex-direction: row;
  justify-content: ${({ position }) => (position ? position : 'center')};
  margin: 0 20px;
  ${props => (props.type === 'reply' ? 'margin: 0' : '')}
`

const BaseContent = styled.View`
  border-radius: 6px;
  padding: 5px;
  margin-bottom: 10px;
  border: solid 1px #e2dacc;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : 'white')}
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '0')}px;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '100%')};
`

const BaseText = styled.Text`
  font-family: regular;
  letter-spacing: 0.3px;
  text-align: ${({ position }) => position};
  ${({ color }) => (color ? `color: ${color}` : '')};
`

const Image = styled.Image`
  width: 290px;
  height: 260px;
  margin-bottom: 5px;
`

const Name = styled.Text`
  font-family: medium;
  letter-spacing: 0.3px;
`

const SubContent = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const StarIcon = styled(FontAwesome).attrs({
  name: 'star',
  size: 14,
  color: colors.orange,
})`
  margin-right: 5px;
`

const TimeText = styled.Text`
  font-family: regular;
  font-size: 12px;
  letter-spacing: 0.3px;
  color: ${({ theme }) => theme.colors.grey};
`

const Bubble = ({
  text,
  name,
  date,
  type,
  messageId,
  imageUrl,
  userId,
  chatId,
  replyingTo,
  setReply,
}) => {
  const menuRef = useRef(null)
  const menuId = useRef(uuid.v4())

  // 當前對話已經 starred 的訊息
  const currentChatStarredMessages = useSelector(
    state => state.message.starredMessages[chatId] ?? {}
  )

  const tempUsers = useSelector(state => state.user.tempUsers)

  // 回覆的用戶
  const replyingToUser = replyingTo && tempUsers[replyingTo.sendBy]

  const isStarred = useMemo(() => {
    const isUserMessage = type === 'myMessage' || type === 'theirMessage'
    return isUserMessage && currentChatStarredMessages[messageId] !== undefined
  }, [type, currentChatStarredMessages, messageId])

  let TouchWrapper = View

  let position = 'center'
  let bgColor = 'white'
  let marginTop = 0
  let textColor = ''
  let textPosition = 'center'
  let maxWidth = '100%'

  switch (type) {
    case 'system':
      bgColor = colors.beige
      marginTop = 10
      textColor = '#64644a'
      break
    case 'error':
      bgColor = colors.red
      marginTop = 10
      textColor = 'white'
      break
    case 'myMessage':
      position = 'flex-end'
      bgColor = colors.primaryLight
      maxWidth = '90%'
      textPosition = 'right'
      TouchWrapper = TouchableWithoutFeedback
      break
    case 'theirMessage':
      position = 'flex-start'
      maxWidth = '90%'
      textPosition = 'left'
      TouchWrapper = TouchableWithoutFeedback
      break
    case 'reply':
      textPosition = 'left'
      bgColor = '#f2f2f2'
      bgColor = colors.greyExtraLight
      break
  }

  const handleOpenMenu = () => {
    menuRef.current.props.ctx.menuActions.openMenu(menuId.current)
  }

  const copyToClipboard = async text => {
    await Clipboard.setStringAsync(text)
  }

  const amOrPmTime = date && formatAmPm(date)

  useEffect(() => {
    console.log('watch imageUrl', imageUrl)
  }, [imageUrl])

  return (
    <Container position={position} type={type}>
      <TouchWrapper
        style={{ width: '100%' }}
        onLongPress={() => handleOpenMenu()}
      >
        <BaseContent
          maxWidth={maxWidth}
          bgColor={bgColor}
          marginTop={marginTop}
        >
          {/* 回覆的留言 */}
          {replyingToUser && (
            <Bubble
              type="reply"
              text={replyingTo.text}
              style={{ margin: 0 }}
              name={`${replyingToUser.firstName} ${replyingToUser.lastName}`}
            />
          )}

          {/* user name */}
          {name && <Name>{name}</Name>}

          {/* Text message */}
          {!imageUrl && (
            <BaseText color={textColor} position={textPosition}>
              {text}
            </BaseText>
          )}

          {/* Image message */}
          {imageUrl && <Image source={{ uri: imageUrl }} />}

          {/* star、time */}
          <SubContent>
            {isStarred && <StarIcon />}
            <TimeText>{amOrPmTime}</TimeText>
          </SubContent>

          {/* menu */}
          <Menu name={menuId.current} ref={menuRef}>
            <MenuTrigger />
            <MenuOptions
              customStyles={{
                optionsWrapper: {
                  padding: 5,
                },
              }}
            >
              {/* 複製 */}
              <BubbleMenuItem
                text="Copy to clipboard"
                icon="copy"
                onSelect={() => copyToClipboard(text)}
              />

              {/* Star */}
              <BubbleMenuItem
                text={`${isStarred ? 'Unstar' : 'Star'} message`}
                icon={isStarred ? 'star' : 'star-o'}
                iconColor={isStarred ? colors.orange : ''}
                iconPack={FontAwesome}
                onSelect={() => starMessage(messageId, chatId, userId)}
              />

              {/* 回覆 */}
              <BubbleMenuItem
                text={`${isStarred ? 'Unstar' : 'Star'} message`}
                icon="reply"
                iconPack={Octicons}
                onSelect={() => setReply()}
              />
            </MenuOptions>
          </Menu>
        </BaseContent>
      </TouchWrapper>
    </Container>
  )
}

export default Bubble
