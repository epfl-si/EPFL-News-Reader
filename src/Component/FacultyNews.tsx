import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader, Card } from 'epfl-elements-react'
import FacultyDropdown from './FacultyDropdown'
import axios from 'axios'
import './FacultyNews.css'

interface News {
  title: string
  subtitle: string
  thumbnail_url: string
}

const FacultyNews = () => {
  const apiPath = import.meta.env.DEV ? '/api' : 'https://corsproxy.io/?https://actu.epfl.ch/api/v1'
  const { lang, facultyId } = useParams()
  const [newsList, setNewsList] = useState<News[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiPath}/channels/${facultyId}/news/?lang=${lang!.toLowerCase()}&limit=5`,
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

  if (newsList.length === 0) {
    return <Loader />
  }

  return (
    <div className="faculty-news-container">
      <FacultyDropdown />
      <div className="faculty-news-card">
        {newsList.map((news, index) => (
          <Card
            key={index}
            picture={{
              alt: 'News thumbnail',
              src: news.thumbnail_url,
              title: 'News thumbnail',
            }}
          >
            <h1>{news.title}</h1>
            <p>{news.subtitle}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default FacultyNews
