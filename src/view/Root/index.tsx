import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'

import { addRecords, getRecords } from '@linround/commonapi'

export const RootPage = function () {
  useEffect(() => {
    console.log('RootPage')
    getRecords()
      .then((response:any) => {
        console.log('getRecords', response)
      })
  }, [])

  useEffect(() => {
    addRecords()
      .then((response:any) => {
        console.log('addRecords', response)
      })
  }, [])
  return (
    <>
      <Outlet />
    </>
  )
}


