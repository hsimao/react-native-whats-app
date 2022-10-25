import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { FontAwesome, Feather } from '@expo/vector-icons'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'

const AuthScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <Input label="First name" icon="user-o" iconPack={FontAwesome} />

        <Input label="Last name" icon="user-o" iconPack={FontAwesome} />

        <Input label="Email" icon="mail" iconPack={Feather} />

        <Input label="Password" icon="lock" iconPack={Feather} />

        <SubmitButton
          title="Sign up"
          style={{ marginTop: 20 }}
          onPress={() => console.log('onPress')}
        />
      </PageContainer>
    </SafeAreaView>
  )
}

export default AuthScreen
