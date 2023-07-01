import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './AuthSlice'
import FirestoreSlice from './FirestoreSlice'

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    firestore: FirestoreSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
