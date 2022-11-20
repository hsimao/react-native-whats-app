import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messageMap: {},
    starredMessages: {},
  },
  reducers: {
    setChatMessage: (state, action) => {
      const existingMessage = state.messageMap
      const { chatId, messageData } = action.payload
      existingMessage[chatId] = messageData
      state.messageMap = existingMessage
    },
    setStarredMessage: (state, action) => {
      state.starredMessages = { ...action.payload }
    },
    addStarredMessage: (state, action) => {
      const { messageId } = action.payload
      state.starredMessages[messageId] = action.payload
    },
    removeStarredMessage: (state, action) => {
      delete state.starredMessages[action.payload]
    },
  },
})

export default messageSlice.reducer
