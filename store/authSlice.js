import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    logoutTimer: null,
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
      state.didTryAutoLogin = true
    },
    setDidTryAutoLogin: state => {
      state.didTryAutoLogin = true
    },
    setLogoutTimer: (state, action) => {
      state.logoutTimer = action.payload
    },
    logout: state => {
      clearTimeout(state.logoutTimer)
      state.token = null
      state.userData = null
      AsyncStorage.clear()
    },
  },
})

export const authenticate = authSlice.actions.authenticate
export const setDidTryAutoLogin = authSlice.actions.setDidTryAutoLogin
export const setLogoutTimer = authSlice.actions.setLogoutTimer
export const logout = authSlice.actions.logout

export default authSlice.reducer
