import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    tempUsers: {},
  },
  reducers: {
    setTempUsers: (state, action) => {
      const newUsers = action.payload
      const existingUsers = state.tempUsers

      const usersArray = Object.values(newUsers)
      usersArray.forEach(user => {
        existingUsers[user.userId] = user
      })

      state.tempUsers = existingUsers
    },
  },
})

export default userSlice.reducer
