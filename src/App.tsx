import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'

function App() {
  console.log('0.0.1')
  return (
    <Router basename={import.meta.env.DEV ? '/' : '/EPFL-News-Reader/'}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

  )
}

export default App
