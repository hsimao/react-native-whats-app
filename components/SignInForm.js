import { Feather } from '@expo/vector-icons'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'
import {
  validateString,
  validateEmail,
  validatePassword,
} from '../utils/validationRule'

const SignInForm = () => {
  const handleInputChange = (id, value) => {
    if (id === 'firstName' || id === 'lastName') {
      console.log(validateString(id, value))
    } else if (id === 'email') {
      console.log('validateEmail', validateEmail(id, value))
    } else if (id === 'password') {
      console.log('validatePassword', validatePassword(id, value))
    }
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
      />
    </>
  )
}

export default SignInForm
