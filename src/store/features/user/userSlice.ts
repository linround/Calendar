import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../index'


function setItem(key:string, value:any) {
  localStorage.setItem(key, JSON.stringify(value))
}
function getItem(key:string):string|null {
  return localStorage.getItem(key)
}
function removeItem(key:string) {
  localStorage.removeItem(key)
}


export interface UserState {
  [prop:string]: any
}
const initialState:UserState = {
  user: null,
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action:PayloadAction<UserState|null>) => {
      state.user = action.payload
      setItem('user', action.payload)
    },
    removerUser: (state) => {
      state.user = null
      removeItem('user')
    },
  },
})

export const { setUser, removerUser, } = userSlice.actions
export default userSlice.reducer
export const selectUser = () =>  JSON.parse(getItem('user') as string)
