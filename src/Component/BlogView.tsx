import React from 'react'
import { Card } from 'epfl-elements-react'
import DOMPurify from 'dompurify'
import './BlogView.css'

interface News {
  title: string
  subtitle: string
  thumbnail_url: string
  news_url: string
}

interface BlogViewProps {
  newsList: News[]
}

const BlogView: React.FC<BlogViewProps> = ({ newsList }) => {
  return (
    <div className="blog-view">
      <div className="blog-news-card">
        {newsList.map((news, index) => (
          <Card
            key={index}
            picture={{
              alt: 'News thumbnail',
              src: news.thumbnail_url,
              title: 'News thumbnail',
            }}
            
          >
            <h2>{news.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(news.subtitle) }} />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BlogView
