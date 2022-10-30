import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    userData: null,
    // 是否已經嘗試過自動登入
    didTryAutoLogin: false,
  },
  reducers: {
    authenticate: (state, action) => {
      const { payload } = action
      state.token = payload.token
      state.userData = payload
    },
    setDidTryAutoLogin: state => (state.didTryAutoLogin = true),
  },
})

export const authenticate = authSlice.actions.authenticate
export const setDidTryAutoLogin = authSlice.actions.setDidTryAutoLogin

export default authSlice.reducer
