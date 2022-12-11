import './App.css'
import {
  Route, Routes, Link
} from 'react-router-dom'
import Home from './view/Home'
import Calendar from './view/Calendar'

function App() {

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Calendar">Calendar</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Calendar" element={<Calendar />}></Route>
      </Routes>
    </>
  )
}

export default App
