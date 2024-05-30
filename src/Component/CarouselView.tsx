import React from 'react'
import { Carousel } from 'epfl-elements-react'
import DOMPurify from 'dompurify'
import './CarouselView.css'
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
    height: 691, // 20% smaller than 864
    width: 1229, // 20% smaller than 1536
    active: index === 0
  }))

  return (
    <div className="carousel-view">
      <Carousel carouselItems={carouselItems} />
    </div>
  )
}

export default CarouselView
