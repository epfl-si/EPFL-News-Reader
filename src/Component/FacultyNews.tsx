import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Loader, Button, Alert } from 'epfl-elements-react'
import FacultyDropdown from './FacultyDropdown'
import axios from 'axios'
import BlogView from './BlogView'
import GridView from './GridView'
import CarouselView from './CarouselView'
import '../styles/FacultyNews.css'
import type { News } from './types'

// List of valid URL parameters
const VALID_LANGUAGES = ['EN', 'FR']
const VALID_FACULTIES = [1, 4, 5, 6, 7, 8, 9, 10] 
const VALID_VIEWS = ['blog', 'grid', 'carousel']

const FacultyNews = () => {
  const apiPath = import.meta.env.DEV ? '/api' : 'https://actu.epfl.ch/api/v1' // Determine API path based on environment
  const { lang, facultyId, viewType } = useParams()
  const [newsList, setNewsList] = useState<News[]>([])  // State to hold news data
  const [error, setError] = useState<string | null>(null)  // State to hold error messages
  const navigate = useNavigate()

  // Validate URL parameters
  useEffect(() => {
    if (!VALID_LANGUAGES.includes(lang!) || !VALID_FACULTIES.includes(Number(facultyId)) || !VALID_VIEWS.includes(viewType!)) {
      navigate('/404')
      return
    }

    // Fetch news data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiPath}/channels/${facultyId}/news/?lang=${lang!.toLowerCase()}&limit=18`
        )
        setNewsList(response.data.results)
        setError(null)  // Clear any previous errors
      } catch (error) {
        console.error('Error fetching the news data', error)
        setError('Error fetching the news data')
      }
    }

    fetchData() // Call fetch data function
  }, [lang, facultyId, viewType, apiPath, navigate])

  // Handle view change
  const handleViewChange = (view: 'blog' | 'grid' | 'carousel') => {
    navigate(`/${lang}/${facultyId}/${view}`)
  }

  // Show loader while data is being fetched
  if (newsList.length === 0 && !error) {
    return <Loader />
  }

  return (
    <div className="faculty-news-container">
      <FacultyDropdown />
      <div className="view-switcher">
        <Button label="Blog" onClickFn={() => handleViewChange('blog')} />
        <Button label="Grid" onClickFn={() => handleViewChange('grid')} />
        <Button label="Carousel" onClickFn={() => handleViewChange('carousel')} />
      </div>
      {error ? (
        <Alert alertType="danger" message="can't fetch news" title="Error"/>
      ) : viewType === 'blog' ? (
        <BlogView newsList={newsList} />
      ) : viewType === 'grid' ? (
        <GridView newsList={newsList} />
      ) : (
        <CarouselView newsList={newsList} />
      )}
    </div>
  )
}

export default FacultyNews
