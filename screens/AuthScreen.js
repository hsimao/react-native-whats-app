import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import Input from '../components/Input'
import { FontAwesome, Feather } from '@expo/vector-icons'

const AuthScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <Input label="First name" icon="user-o" iconPack={FontAwesome} />

        <Input label="Last name" icon="user-o" iconPack={FontAwesome} />

        <Input label="Email" icon="mail" iconPack={Feather} />

        <Input label="Password" icon="lock" iconPack={Feather} />
      </PageContainer>
    </SafeAreaView>
  )
}

export default AuthScreen
