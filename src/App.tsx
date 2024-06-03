
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CustomHeader from './Component/CustomHeader'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import FacultyNews from './Component/FacultyNews'
import CustomFooter from './Component/CustomFooter'

import './index.css'

function App() {
  return (
    <div className='page-body'>
      <Router basename={import.meta.env.DEV ? '/' : '/EPFL-News-Reader/'}>
        <CustomHeader/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/EN" element={<Home />} />
          <Route path="/FR" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/:lang/:facultyId/:viewType" element={<FacultyNews />} />
        </Routes>
        <CustomFooter/> 
      </Router>
    </div>
  )
}

export default App
