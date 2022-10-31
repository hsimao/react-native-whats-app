import React, {
  useState,
  useCallback,
  useReducer,
  useEffect,
  useMemo,
} from 'react'
import { Alert, ActivityIndicator, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { FontAwesome, Feather } from '@expo/vector-icons'
import PageContainer from '../components/PageContainer'
import PageTitle from '../components/PageTitle'
import Input from '../components/Input'
import SubmitButton from '../components/SubmitButton'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducer'
import { colors } from '../theme/colors'
import { updateUser } from '../services/users/updateUser'
import { useActions } from '../store/hooks'

const SettingsScreen = () => {
  const { logout, updateUserData } = useActions()

  const userData = useSelector(state => state.auth.userData)
  const firstName = userData.firstName || ''
  const lastName = userData.lastName || ''
  const email = userData.email || ''
  const about = userData.about || ''

  const initialState = {
    inputValues: {
      firstName,
      lastName,
      email,
      about,
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      about: undefined,
    },
    formIsValid: false,
  }

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [formState, dispatchFormState] = useReducer(reducer, initialState)

  const hasChange = useMemo(() => {
    const currentValues = formState.inputValues
    return (
      currentValues.firstName !== firstName ||
      currentValues.lastName !== lastName ||
      currentValues.email !== email ||
      currentValues.about !== about
    )
  }, [formState, userData])

  const showSaveButton = useMemo(() => {
    return !isLoading && hasChange
  }, [hasChange, isLoading])

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

  const handleSubmit = useCallback(async () => {
    try {
      setError('')
      setIsLoading(true)

      await updateUser(userData.userId, formState.inputValues)
      updateUserData(formState.inputValues)

      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
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
    <PageContainer>
      <PageTitle>Settings</PageTitle>

      <Input
        id="firstName"
        label="First name"
        icon="user-o"
        iconPack={FontAwesome}
        initialValue={userData.firstName}
        onInputChange={handleInputChange}
        autoCapitalize="none"
        errorText={getErrorById('firstName')}
      />

      <Input
        id="lastName"
        label="Last name"
        icon="user-o"
        iconPack={FontAwesome}
        initialValue={userData.lastName}
        onInputChange={handleInputChange}
        autoCapitalize="none"
        errorText={getErrorById('lastName')}
      />

      <Input
        id="email"
        label="Email"
        icon="mail"
        iconPack={Feather}
        initialValue={userData.email}
        onInputChange={handleInputChange}
        autoCapitalize="none"
        keyboardType="email-address"
        errorText={getErrorById('email')}
      />

      <Input
        id="about"
        label="About"
        icon="user-o"
        iconPack={FontAwesome}
        initialValue={userData.about}
        onInputChange={handleInputChange}
        autoCapitalize="none"
        errorText={getErrorById('about')}
      />

      <View style={{ marginTop: 20 }}>
        {showSuccessMessage && (
          <Text style={{ textAlign: 'center' }}>Saved!</Text>
        )}

        {isLoading && (
          <ActivityIndicator
            size={'small'}
            color={colors.primary}
            style={{ marginTop: 10 }}
          />
        )}

        {showSaveButton && (
          <SubmitButton
            title="Save"
            style={{ marginTop: 20 }}
            onPress={handleSubmit}
            disabled={!formState.formIsValid}
          />
        )}
      </View>

      <SubmitButton
        title="Logout"
        style={{ marginTop: 20 }}
        color={colors.red}
        onPress={logout}
      />
    </PageContainer>
  )
}

export default SettingsScreen
