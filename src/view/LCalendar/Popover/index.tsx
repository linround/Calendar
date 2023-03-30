import { AddCalendarPopover } from '../SideComponent/AddCalendarPopover'
import { CreatePopover } from './CreatePopover'
import { NormalPopover } from './NormalPopover'
import { AccountPopover } from './AccountPopover'
import { AssistantComponent } from '../AssistantComponent'
import React from 'react'

export const PopoverComponents = () => (
  <>
    <AssistantComponent />
    <AddCalendarPopover />
    <CreatePopover />
    <NormalPopover />
    <AccountPopover />
  </>
)
