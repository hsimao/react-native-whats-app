import {
  validateString,
  validateEmail,
  validatePassword,
} from '../validationRule'

// 驗證規則對照表
const validateMap = new Map([
  ['lastName', validateString],
  ['firstName', validateString],
  ['email', validateEmail],
  ['password', validatePassword],
])

export const validateInput = (inputId, inputValue) => {
  return (
    validateMap.get(inputId) && validateMap.get(inputId)(inputId, inputValue)
  )
}
