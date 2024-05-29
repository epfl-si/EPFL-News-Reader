import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Loader, Button } from 'epfl-elements-react'
import FacultyDropdown from './FacultyDropdown'
import axios from 'axios'
import BlogView from './BlogView'
import GridView from './GridView'
import './FacultyNews.css'

interface News {
  title: string
  subtitle: string
  thumbnail_url: string
  news_url: string
}

const FacultyNews = () => {
  const apiPath = import.meta.env.DEV ? '/api' : 'https://corsproxy.io/?https://actu.epfl.ch/api/v1'
  const { lang, facultyId, viewType } = useParams()
  const [newsList, setNewsList] = useState<News[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      }
    }

    fetchData()
  }, [lang, facultyId, apiPath])

  const handleViewChange = (view: 'blog' | 'grid') => {
    navigate(`/${lang}/${facultyId}/${view}`)
  }

  if (newsList.length === 0) {
    return <Loader />
  }

  return (
    <div className="faculty-news-container">
      <FacultyDropdown />
      <div className="view-switcher">
        <Button label="▢" onClickFn={() => handleViewChange('blog')} />
        <Button label="▦" onClickFn={() => handleViewChange('grid')} />
      </div>
      {viewType === 'blog' ? (
        <BlogView newsList={newsList} />
      ) : (
        <GridView newsList={newsList} />
      )}
    </div>
  )
}

export default FacultyNews
