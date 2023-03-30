import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import userReducer from './features/user/userSlice'
import promptBoxReducer from './features/PromptBox/promptBoxSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    promptBox: promptBoxReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

