import React from 'react'
import { Card, Collapse } from 'epfl-elements-react'
import DOMPurify from 'dompurify'
import '../styles/BlogView.css'
import type { News } from './types'
import dayjs from 'dayjs'

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
            <Collapse
              idCollapse="collapseButton"
              label="More info"
              text={[
                `Author: ${news.authors && news.authors.length > 0 ? news.authors.map(author => `${author.first_name} ${author.last_name}`).join(', ') : 'Unknown'}`,
                `Published: ${dayjs(news.publish_date).format('DD/MM/YYYY')}`
              ]}
            />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BlogView
