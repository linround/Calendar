import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props,
  ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />
})

interface IProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  severity: AlertColor
}
export  function CommonMessage(props:React.PropsWithChildren<IProps>) {
  const { open, setOpen, children, severity, } = props
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Stack>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
        open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          { children}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
