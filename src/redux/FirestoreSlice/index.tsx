import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  val: [],
}

const firestoreSlice = createSlice({
  name: 'firestore',
  initialState,
  reducers: {
    addFireStoreUser: (state, action) => {
      state.val = action.payload
    },
  },
})

export const { addFireStoreUser } = firestoreSlice.actions
export default firestoreSlice.reducer
