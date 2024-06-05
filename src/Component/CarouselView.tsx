import { Carousel } from 'epfl-elements-react'
import DOMPurify from 'dompurify'
import '../styles/CarouselView.css'
import type { News } from './types'

interface CarouselViewProps {
  newsList: News[]
}

const sanitizeAndExtractText = (html: string) => {
  const sanitizedHtml = DOMPurify.sanitize(html)
  const parser = new DOMParser()
  const doc = parser.parseFromString(sanitizedHtml, 'text/html')
  return doc.body.textContent || ''
}

const CarouselView: React.FC<CarouselViewProps> = ({ newsList }) => {
  if (newsList.length === 0) {
    return <div>No news items available.</div>
  }

  const carouselItems = newsList.map((news, index) => ({
    content: sanitizeAndExtractText(news.subtitle),
    id: news.id,
    link: news.news_url,
    src: news.thumbnail_url,
    title: news.title,
    height: 691,
    width: 1229,
    active: index === 0
  }))

  return (
    <div className="carousel-view">
      <Carousel carouselItems={carouselItems} />
    </div>
  )
}

export default CarouselView
