import React, { useState } from 'react'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import SignInForm from '../components/SignInForm'
import SignUpForm from '../components/SignUpForm'

const SwitchWrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin: 15px 0;
`

const SwitchText = styled.Text`
  color: ${({ theme }) => theme.colors.blue};
  font-family: 'medium';
  letter-spacing: 0.3px;
`

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        {/* Form */}
        {isSignUp ? <SignUpForm /> : <SignInForm />}

        {/* Switch Form */}
        <SwitchWrapper onPress={() => setIsSignUp(prevValue => !prevValue)}>
          <SwitchText>
            {`Switch to ${isSignUp ? 'sign in' : 'sign up'}`}
          </SwitchText>
        </SwitchWrapper>
      </PageContainer>
    </SafeAreaView>
  )
}

export default AuthScreen
