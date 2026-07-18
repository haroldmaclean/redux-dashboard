import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    loggedIn: false,
  },
  reducers: {
    logIn: (state, action) => {
      state.name = action.payload
      state.loggedIn = true
    },
    logout: (state, action) => {
      state.name = action.payload
      state.loggedIn = false
    },
  },
})

export const { logIn, logout } = userSlice.actions

export default userSlice.reducer
