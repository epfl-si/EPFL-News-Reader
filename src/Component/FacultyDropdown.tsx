import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Dropdown } from 'epfl-elements-react'
import { useNavigate } from 'react-router-dom'

interface Faculty {
  id: number
  en_label: string
}

const FacultyDropdown: React.FC = () => {
  const apiPath = import.meta.env.DEV ? '/api' : 'https://corsproxy.io/?https://actu.epfl.ch/api/v1'
  const [faculties, setFaculties] = useState<Faculty[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get(apiPath + '/faculties/')
        console.log('API Response:', response.data) // For some reason known to no other than god himself, it won't load the faculty list correctly in the dropdown without this console log
        if (response.data && response.data.results) {
          setFaculties(response.data.results.map((faculty: Faculty) => ({
            id: faculty.id,
            en_label: faculty.en_label
          })))
        } else {
          console.error('Unexpected API response structure:', response.data)
        }
      } catch (error) {
        console.error('Error fetching the faculties', error)
      }
    }

    fetchFaculties()
  }, [apiPath])

  const handleFacultyChange = (option: string) => {
    const selectedFaculty = faculties.find(faculty => faculty.en_label === option)
    const pathSegments = window.location.pathname.split('/')
    const basePath = import.meta.env.DEV ? '' : 'EPFL-News-Reader'
    const langIndex = basePath ? 2 : 1
    const lang = pathSegments[langIndex] || 'EN' // Default to 'EN' if no language is present
  
    console.log('pathSegments:', pathSegments)     // DEBUG
  
    if (selectedFaculty) {
      const newLink = (`/${lang}/${selectedFaculty.id}`)
      console.log('lang : ' + lang)           // DEBUG
      console.log('newlink : ' + newLink)     // DEBUG
      navigate(newLink)
    } else if (option === 'None') {
      navigate(`/${basePath ? basePath + '/' : ''}${lang}`)
    } else if (option === 'All') {
      navigate(`/${basePath ? basePath + '/' : ''}${lang}/all`)
    }
  }
  
  
  const facultyOptions = faculties.map(faculty => ({ option: faculty.en_label }))
  facultyOptions.unshift({ option: 'None' })
  facultyOptions.push({ option: 'All' })

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', width: '100%' }}>
      <Dropdown
        label="Faculty : "
        onChangeFn={handleFacultyChange}
        options={facultyOptions}
      />
    </div>
  )
}

export default FacultyDropdown
