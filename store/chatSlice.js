import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatsData: {},
  },
  reducers: {
    setChatsData: (state, action) => {
      state.chatsData = action.payload
    },
  },
})

export default chatSlice.reducer
