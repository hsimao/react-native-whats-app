import React, { useRef } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import { colors } from '../theme/colors'
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu'
import uuid from 'react-native-uuid'
import * as Clipboard from 'expo-clipboard'

const Container = styled.View`
  flex-direction: row;
  justify-content: ${({ position }) => (position ? position : 'center')};
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

const Bubble = ({ text, type }) => {
  const menuRef = useRef(null)
  const menuId = useRef(uuid.v4())

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
  }

  const handleOpenMenu = () => {
    menuRef.current.props.ctx.menuActions.openMenu(menuId.current)
  }

  const copyToClipboard = async text => await Clipboard.setStringAsync(text)

  return (
    <Container position={position}>
      <TouchWrapper
        style={{ width: '100%' }}
        onLongPress={() => handleOpenMenu()}
      >
        <BaseContent
          maxWidth={maxWidth}
          bgColor={bgColor}
          marginTop={marginTop}
        >
          <BaseText color={textColor} position={textPosition}>
            {text}
          </BaseText>
          <Menu name={menuId.current} ref={menuRef}>
            <MenuTrigger />
            <MenuOptions>
              {/* 複製到剪貼簿 */}
              <MenuOption
                text="Copy to clipboard"
                onSelect={() => copyToClipboard(text)}
              />
              <MenuOption text="Option 2" />
              <MenuOption text="Option 3" />
            </MenuOptions>
          </Menu>
        </BaseContent>
      </TouchWrapper>
    </Container>
  )
}

export default Bubble
