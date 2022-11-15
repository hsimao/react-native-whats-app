import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messageMap: {},
  },
  reducers: {
    setChatMessage: (state, action) => {
      const existingMessage = state.messageMap
      const { chatId, messageData } = action.payload
      existingMessage[chatId] = messageData
      state.messageMap = existingMessage
    },
  },
})

export default messageSlice.reducer
