import { Route, Routes } from 'react-router-dom'
import Home from './view/Home'
import Calendar from './view/Calendar'
import Buttons from './view/Buttons'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Calendar" element={<Calendar />}></Route>
        <Route path="/Buttons" element={<Buttons />}></Route>
      </Routes>
    </>
  )
}

export default App
