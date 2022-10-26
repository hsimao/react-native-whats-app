import { useReducer, useCallback } from 'react'
import { Feather } from '@expo/vector-icons'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'
import { validateInput } from '../utils/actions/formActions'
import { signUp } from '../utils/actions/authActions'
import { reducer } from '../utils/reducers/formReducer'

const initialState = {
  inputValues: {
    email: '',
    password: '',
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
}

const SignInForm = () => {
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

  const handleSignIn = () => {
    signUp({
      email: formState.inputValues.email,
      password: formState.inputValues.password,
    })
  }

  return (
    <>
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

      <SubmitButton
        title="Sign In"
        style={{ marginTop: 20 }}
        onPress={handleSignIn}
        disabled={!formState.formIsValid}
      />
    </>
  )
}

export default SignInForm
