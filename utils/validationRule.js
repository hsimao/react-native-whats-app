import { validate } from 'validate.js'

const formatValidateResult = (id, value, constraints) => {
  const validationResult = validate({ [id]: value }, { [id]: constraints })
  return validationResult && validationResult[id]
}

export const validateString = (id, value) => {
  const constraints = {
    presence: { allowEmpty: false },
  }

  // 有值才加入格式驗證規則
  if (value) {
    // https://validatejs.org/#validators-format
    constraints.format = {
      pattern: '[a-z]+',
      flags: 'i',
      message: 'value can only contain letters',
    }
  }

  return formatValidateResult(id, value, constraints)
}

export const validateEmail = (id, value) => {
  const constraints = {
    presence: { allowEmpty: false },
  }

  // 有值才加入格式驗證規則
  if (value) constraints.email = true

  return formatValidateResult(id, value, constraints)
}

export const validatePassword = (id, value) => {
  const constraints = {
    presence: { allowEmpty: false },
  }

  // 有值才加入格式驗證規則
  if (value) {
    constraints.length = {
      minimum: 6,
      message: 'must bet at least 6 characters',
    }
  }

  return formatValidateResult(id, value, constraints)
}
