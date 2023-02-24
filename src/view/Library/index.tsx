import { SWRComponent } from './Swr'
import { useState } from 'react'
export function LibraryComponent() {
  const [showSWR] = useState<boolean>(true)
  return (
    <>
      { showSWR && (<SWRComponent />) }
    </>
  )
}
