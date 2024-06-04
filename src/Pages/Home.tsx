import '../styles/Home.css'
import { ExternalLink } from 'epfl-elements-react'
import FacultyDropdown from '../Component/FacultyDropdown'

const Home = () => {
  return (
    <div className="home-container">
      <h2>EPFL-News-Reader Demo App</h2>
      <div className='links'>
        <ExternalLink href='https://www.npmjs.com/package/epfl-elements-react'>
          <b>NPM Package               </b>
        </ExternalLink>
        <ExternalLink href='https://github.com/epfl-si/epfl-elements-react'>
          <b>               EPFL-Element-React GitHub</b>
        </ExternalLink>
      </div>
      <FacultyDropdown/>
    </div>
  )
}

export default Home
