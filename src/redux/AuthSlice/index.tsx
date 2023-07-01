import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type name = {
  val: string
}

const initialState: name = {
  val: localStorage.getItem('fullName')
    ? localStorage.getItem('fullName')!
    : '',
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
      state.val = action.payload
    },
    delUser: (state) => {
      state.val = ''
    },
  },
})

export const { addUser, delUser } = authSlice.actions
export default authSlice.reducer
