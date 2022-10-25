import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import Input from '../components/Input'
import { FontAwesome } from '@expo/vector-icons'

const AuthScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <Input label="First name" icon="user-o" iconPack={FontAwesome} />
      </PageContainer>
    </SafeAreaView>
  )
}

export default AuthScreen
