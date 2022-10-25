import React, { useState } from 'react'
import styled from 'styled-components/native'
import { ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import SignInForm from '../components/SignInForm'
import SignUpForm from '../components/SignUpForm'

const LogoWrapper = styled.View`
  justify-content: center;
  align-items: center;
`

const LogoImage = styled.Image.attrs({
  source: require('../assets/images/logo.png'),
  resizeMode: 'contain',
})`
  width: 50%;
`

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

// IOS keyboard 顯示時, 將內容向上推效果
const KeyboardAvoidingViewStyle = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'height' : undefined,
  keyboardVerticalOffset: 100,
})`
  flex: 1;
  justify-content: center;
`

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <ScrollView>
          <KeyboardAvoidingViewStyle>
            {/* Logo */}
            <LogoWrapper>
              <LogoImage />
            </LogoWrapper>

            {/* Form */}
            {isSignUp ? <SignUpForm /> : <SignInForm />}

            {/* Switch Form */}
            <SwitchWrapper onPress={() => setIsSignUp(prevValue => !prevValue)}>
              <SwitchText>
                {`Switch to ${isSignUp ? 'sign in' : 'sign up'}`}
              </SwitchText>
            </SwitchWrapper>
          </KeyboardAvoidingViewStyle>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  )
}

export default AuthScreen
