export const reducer = (state, action) => {
  const { validationResult, id } = action

  const updatedValidities = {
    ...state.inputValidities,
    [id]: validationResult,
  }

  let formIsValid = true
  // 如果有其中一個回傳不是 undefined, 表單則不過
  for (const key in updatedValidities) {
    if (updatedValidities[key] !== undefined) {
      formIsValid = false
      break
    }
  }

  return { inputValidities: updatedValidities, formIsValid }
}
