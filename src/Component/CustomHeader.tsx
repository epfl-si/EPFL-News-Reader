import '../styles/CustomHeader.css'
import { Header, Language } from 'epfl-elements-react'
import { useLocation } from 'react-router-dom'

const CustomHeader = () => {
  const location = useLocation()
  const basePath = import.meta.env.DEV ? '' : '/EPFL-News-Reader'

  // Assess if EN or FR is selected
  const isFrench = location.pathname.startsWith('/FR')
  const activeLanguage = isFrench ? 'FR' : 'EN'

  // Get the current path and replace the language part of it
  const pathSegments = location.pathname.split('/')
  const facultyId = pathSegments[2] || ''
  const viewType = pathSegments[3] || 'blog'

  const enLink = facultyId ? `${basePath}/EN/${facultyId}/${viewType}` : `${basePath}/EN`
  const frLink = facultyId ? `${basePath}/FR/${facultyId}/${viewType}` : `${basePath}/FR`

  return (
    <div className='Box'>
      <div className='HeaderBox'>
        <Header
          drawerContents={{
            anchor: 'Go to main site',
            link: 'https://www.epfl.ch',
          }}
          topMenuItems={[
            { anchor: 'About', link: 'https://www.epfl.ch/about/' },
            { anchor: 'Education', link: 'https://www.epfl.ch/education' },
            { anchor: 'Research', link: 'https://www.epfl.ch/research' },
            { anchor: 'Innovation', link: 'https://www.epfl.ch/innovation/' },
            { anchor: 'Schools', link: 'https://www.epfl.ch/schools/' },
            { anchor: 'Campus', link: 'https://www.epfl.ch/campus/' },
          ]}
        />
      </div>
      <div className='LanguageBox'>
        <Language active={activeLanguage} enLink={frLink} frLink={enLink} />
      </div>
    </div>
  )
}

export default CustomHeader
