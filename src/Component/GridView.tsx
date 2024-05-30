import React from 'react'
import { Card } from 'epfl-elements-react'
import './GridView.css'
import type { News } from './types'


interface GridViewProps {
  newsList: News[]
}

const GridView: React.FC<GridViewProps> = ({ newsList }) => {
  return (
    <div className="card-deck mini-cards">
      {newsList.map((news, index) => (
        <Card
          key={index}
          link={news.news_url}
          picture={{
            alt: 'News thumbnail',
            src: news.thumbnail_url,
            title: 'News thumbnail',
          }}
        >
          <h4>{news.title}</h4>
        </Card>
      ))}
    </div>
  )
}

export default GridView
