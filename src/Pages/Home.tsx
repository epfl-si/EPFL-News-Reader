import { ExternalLink } from 'epfl-elements-react'
import './Home.css'
import packageJson from '../../package.json' // Adjust the path as needed
import FacultyDropdown from '../Component/FacultyDropdown'

const Home = () => {
  return (
    <div className="home-container">
      <h2>EPFL-News-Reader Demo App</h2>
      <div className="version-container">
        <p>{packageJson.version}</p>
        <ExternalLink href="https://github.com/epfl-si/EPFL-News-Reader">
          <b>GitHub</b>
        </ExternalLink>
      </div>
      <FacultyDropdown/>
    </div>
  )
}

export default Home
