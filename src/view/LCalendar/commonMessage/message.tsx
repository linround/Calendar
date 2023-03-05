import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props,
  ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />
})

interface IProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export  function CommonMessage(props:IProps) {
  const { open, setOpen, } = props
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Stack>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
        open={open} autoHideDuration={30000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          创建成功
        </Alert>
      </Snackbar>
    </Stack>
  )
}
