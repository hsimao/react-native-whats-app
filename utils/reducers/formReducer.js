export const reducer = (state, action) => {
  const { validationResult, inputId, inputValue } = action

  const updatedValues = {
    ...state.inputValues,
    [inputId]: inputValue,
  }

  const updatedValidities = {
    ...state.inputValidities,
    [inputId]: validationResult,
  }

  let formIsValid = true
  // 如果有其中一個回傳不是 undefined, 表單則不過
  for (const key in updatedValidities) {
    if (updatedValidities[key] !== undefined) {
      formIsValid = false
      break
    }
  }

  return {
    inputValues: updatedValues,
    inputValidities: updatedValidities,
    formIsValid,
  }
}
