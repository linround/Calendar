import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { promptBoxSelector, setOpen } from '../../../store/features/PromptBox/promptBoxSlice'
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props,
  ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />
})

export  function CommonMessage() {
  const { severity, message, open, } = useAppSelector(promptBoxSelector)
  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(setOpen({ open: false, }))
  }

  return (
    <Stack>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
        open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          { message}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
