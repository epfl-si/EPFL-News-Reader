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
        console.log('API Response:', response.data) // Log the full response
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
    const lang = pathSegments[1] || 'EN' // Default to 'EN' if no language is present

    if (selectedFaculty) {
      navigate(`/${lang}/${selectedFaculty.id}`)
    } else if (option === 'None') {
      navigate('/')
    } else if (option === 'All') {
      navigate(`/${lang}/all`)
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
