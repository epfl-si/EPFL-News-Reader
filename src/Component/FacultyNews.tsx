import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from 'epfl-elements-react'
import FacultyDropdown from './FacultyDropdown'
import axios from 'axios'

interface News {
  title: string;
  subtitle: string;
}

const FacultyNews = () => {
  const apiPath = import.meta.env.DEV ? '/api' : 'https://corsproxy.io/?https://actu.epfl.ch/api/v1'
  const { lang, facultyId } = useParams()
  const [news, setNews] = useState<News | null>(null)
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          apiPath + `/news/?faculties=${facultyId}&lang=${lang!.toLowerCase()}&limit=1`,
          {
            headers: {        
              'Access-Control-Allow-Origin' : '*', 
              'Access-Control-Allow-Methods' :    'GET',
              'Content-Type': 'application/json'
            },
          }
        )
        setNews(response.data.results[0])
      } catch (error) {
        console.error('Error fetching the news data', error)
      }
    }

    fetchData()
  }, [lang, facultyId, apiPath])

  if (!news) {
    return <Loader />
  }

  return (
    <div>
      <FacultyDropdown/>
      <h1>{news.title}</h1>
      <h2>{news.subtitle}</h2>
    </div>
  )
}

export default FacultyNews
