import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlertColor } from '@mui/material/Alert'
import { RootState } from '../../index'

interface PromptBoxState {
  severity?:AlertColor
  message?: string
  open?: boolean
}
const initialState:PromptBoxState = {
  severity: 'success',
  message: '无信息',
  open: true,
}
export const promptBoxSlice = createSlice({
  name: 'promptBox',
  initialState,
  reducers: {
    setSeverity(state, action:PayloadAction<PromptBoxState>) {
      state.severity = action.payload.severity
    },
    setMessage(state, action:PayloadAction<PromptBoxState>) {
      state.message = action.payload.message
    },
    setOpen(state, action:PayloadAction<PromptBoxState>) {
      state.open = action.payload.open
    },
  },
})
export const { setSeverity, setOpen, setMessage, } = promptBoxSlice.actions
export const promptBoxSelector = (state:RootState) => state.promptBox
export default promptBoxSlice.reducer
