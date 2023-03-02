import React from 'react'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

export function CalendarGroups() {
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div>
      <div onClick={handleClick}>
        <ListItemText primary="我的日历" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </div>
      <Collapse in={open} >
        <div>
          生活
        </div>
        <div>
          工作
        </div>
      </Collapse>
    </div>
  )
}
