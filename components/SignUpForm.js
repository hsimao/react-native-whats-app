import { FontAwesome, Feather } from '@expo/vector-icons'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'
import { validateInput } from '../utils/actions/formActions'

const SignUpForm = () => {
  const handleInputChange = (id, value) => {
    console.log(validateInput(id, value))
  }

  return (
    <>
      <Input
        id="firstName"
        label="First name"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChange={handleInputChange}
        autoCapitalize="none"
      />

      <Input
        id="lastName"
        label="Last name"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChange={handleInputChange}
        autoCapitalize="none"
      />

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
        title="Sign up"
        style={{ marginTop: 20 }}
        onPress={() => console.log('onPress')}
      />
    </>
  )
}

export default SignUpForm
