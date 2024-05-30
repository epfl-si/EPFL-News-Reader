import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Loader, Button } from 'epfl-elements-react'
import FacultyDropdown from './FacultyDropdown'
import axios from 'axios'
import BlogView from './BlogView'
import GridView from './GridView'
import CarouselView from './CarouselView'
import './FacultyNews.css'
import type { News } from './types'

const FacultyNews = () => {
  const apiPath = import.meta.env.DEV ? '/api' : 'https://corsproxy.io/?https://actu.epfl.ch/api/v1'
  const { lang, facultyId, viewType } = useParams()
  const [newsList, setNewsList] = useState<News[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `${apiPath}/channels/${facultyId}/news/?lang=${lang!.toLowerCase()}&limit=18`,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET',
              'Content-Type': 'application/json',
            },
          }
        )
        setNewsList(response.data.results)
      } catch (error) {
        console.error('Error fetching the news data', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [lang, facultyId, apiPath])

  const handleViewChange = (view: 'blog' | 'grid' | 'carousel') => {
    navigate(`/${lang}/${facultyId}/${view}`)
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="faculty-news-container">
      <FacultyDropdown />
      <div className="view-switcher">
        <Button label="▢" onClickFn={() => handleViewChange('blog')} />
        <Button label="▦" onClickFn={() => handleViewChange('grid')} />
        <Button label="▣" onClickFn={() => handleViewChange('carousel')} />
      </div>
      {viewType === 'blog' ? (
        <BlogView newsList={newsList} />
      ) : viewType === 'grid' ? (
        <GridView newsList={newsList} />
      ) : (
        <CarouselView key={`${facultyId}-${viewType}`} newsList={newsList} />
      )}
    </div>
  )
}

export default FacultyNews