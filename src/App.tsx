import 'epfl-elements/dist/css/elements.css'
import 'epfl-elements/dist/css/vendors.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CustomHeader from './Component/CustomHeader'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'

function App() {
  console.log('0.0.4')
  return (
    <div>
      <Router basename={import.meta.env.DEV ? '/' : '/EPFL-News-Reader/'}>
        <CustomHeader/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/EN" element={<Home />} />
          <Route path="/FR" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
