import {
  validateString,
  validateEmail,
  validatePassword,
  validateLength,
} from '../validationRule'

// 驗證規則對照表
const validateMap = new Map([
  ['lastName', validateString],
  ['firstName', validateString],
  ['email', validateEmail],
  ['password', validatePassword],
  ['about', (id, value) => validateLength(id, value, 0, 150, true)],
])

export const validateInput = (inputId, inputValue) => {
  return (
    validateMap.get(inputId) && validateMap.get(inputId)(inputId, inputValue)
  )
}
