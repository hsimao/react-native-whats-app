import { useEffect, useReducer, useCallback, useState } from 'react'
import { Alert, ActivityIndicator } from 'react-native'
import { FontAwesome, Feather } from '@expo/vector-icons'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'
import { validateInput } from '../utils/actions/formActions'
import { signUp } from '../services/auth/signUp'
import { reducer } from '../utils/reducers/formReducer'
import { colors } from '../theme/colors'
import { useActions } from '../store/hooks'

const initialState = {
  inputValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
}

const SignUpForm = () => {
  const { authenticate } = useActions()
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

  const handleSignUp = async () => {
    try {
      setError('')
      setIsLoading(true)

      const userData = await signUp({
        firstName: formState.inputValues.firstName,
        lastName: formState.inputValues.lastName,
        email: formState.inputValues.email,
        password: formState.inputValues.password,
      })
      authenticate(userData)
    } catch (error) {
      console.log('error', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // show error alert
  useEffect(() => {
    error && Alert.alert('An error occurred', error, [{ text: 'Okay' }])
  }, [error])

  return (
    <>
      <Input
        id="firstName"
        label="First name"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChange={handleInputChange}
        autoCapitalize="none"
        errorText={getErrorById('firstName')}
      />

      <Input
        id="lastName"
        label="Last name"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChange={handleInputChange}
        autoCapitalize="none"
        errorText={getErrorById('lastName')}
      />

      <Input
        id="email"
        label="Email"
        icon="mail"
        iconPack={Feather}
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
          title="Sign up"
          style={{ marginTop: 20 }}
          onPress={handleSignUp}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  )
}

export default SignUpForm
