import { useReducer, useEffect, useCallback, useState } from 'react'
import { Alert, ActivityIndicator } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'
import { validateInput } from '../utils/actions/formActions'
import { signIn } from '../services/auth/signIn'
import { reducer } from '../utils/reducers/formReducer'
import { useActions } from '../store/hooks'
import { colors } from '../theme/colors'

const isTestMode = true

const initialState = {
  inputValues: {
    email: isTestMode ? 'mars@gmail.com' : '',
    password: isTestMode ? 'a123456' : '',
  },
  inputValidities: {
    email: isTestMode,
    password: isTestMode,
  },
  formIsValid: isTestMode,
}

const SignInForm = () => {
  const { authenticate, setLogoutTimer, logout } = useActions()

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [formState, dispatchFormState] = useReducer(reducer, initialState)

  const handleInputChange = useCallback(
    (id, value) => {
      const result = validateInput(id, value)
      dispatchFormState({
        inputId: id,
        inputValue: value,
        validationResult: result,
      })
    },
    [dispatchFormState]
  )

  const getErrorById = useCallback(
    id => {
      const errorList = formState.inputValidities[id]
      return errorList && errorList[0]
    },
    [formState.inputValidities]
  )

  const handleSignIn = useCallback(async () => {
    try {
      setError('')
      setIsLoading(true)

      const userData = await signIn({
        email: formState.inputValues.email,
        password: formState.inputValues.password,
      })

      // save to store
      authenticate(userData)

      // token 到期登出
      setLogoutTimer(
        setTimeout(() => logout(), userData.millisecondsUntilExpiry)
      )
    } catch (error) {
      console.log('error', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [formState])

  // show error alert
  useEffect(() => {
    error && Alert.alert('An error occurred', error, [{ text: 'Okay' }])
  }, [error])

  return (
    <>
      <Input
        id="email"
        label="Email"
        icon="mail"
        iconPack={Feather}
        initialValue={formState.inputValues.email}
        onInputChange={handleInputChange}
        autoCapitalize="none"
        keyboardType="email-address"
        errorText={getErrorById('email')}
      />

      <Input
        id="password"
        label="Password"
        icon="lock"
        iconPack={Feather}
        initialValue={formState.inputValues.password}
        onInputChange={handleInputChange}
        autoCapitalize="none"
        secureTextEntry
        errorText={getErrorById('password')}
      />

      {isLoading ? (
        <ActivityIndicator
          size={'small'}
          color={colors.primary}
          style={{ marginTop: 10 }}
        />
      ) : (
        <SubmitButton
          title="Sign In"
          style={{ marginTop: 20 }}
          onPress={handleSignIn}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  )
}

export default SignInForm
