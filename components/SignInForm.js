import { useReducer, useCallback } from 'react'
import { Feather } from '@expo/vector-icons'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducer'

const initialState = {
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
      dispatchFormState({ id, validationResult: result })
    },
    [dispatchFormState]
  )

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
      />

      <Input
        id="password"
        label="Password"
        icon="lock"
        iconPack={Feather}
        onInputChange={handleInputChange}
        autoCapitalize="none"
        secureTextEntry
      />

      <SubmitButton
        title="Sign In"
        style={{ marginTop: 20 }}
        onPress={() => console.log('onPress')}
        disabled={!formState.formIsValid}
      />
    </>
  )
}

export default SignInForm
