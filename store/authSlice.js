import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    userData: null,
  },
  reducers: {
    authenticate: (state, action) => {
      const { payload } = action
      state.token = payload.token
      state.userData = payload
    },
  },
})

export const authenticate = authSlice.actions.authenticate

export default authSlice.reducer
