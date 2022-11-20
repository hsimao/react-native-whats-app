import React from 'react'
import styled from 'styled-components/native'
import { MenuOption } from 'react-native-popup-menu'
import { Feather } from '@expo/vector-icons'

const Container = styled(MenuOption)`
  flex-direction: row;
  padding: 6px 10px;
`

const Text = styled.Text`
  flex: 1;
  font-family: regular;
  letter-spacing: 0.3px;
  font-size: 16px;
`

const BubbleMenuItem = ({ text, onSelect, icon, iconPack }) => {
  const Icon = iconPack ?? Feather

  return (
    <Container onSelect={onSelect}>
      <Text>{text}</Text>
      <Icon name={icon} size={18} />
    </Container>
  )
}

export default BubbleMenuItem
