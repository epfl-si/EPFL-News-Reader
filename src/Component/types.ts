export interface News {
    id: number,
    title: string
    subtitle: string
    thumbnail_url: string
    news_url: string
    authors: Author[]
    publish_date: string
  }
  
export interface Author {
    first_name: string
    last_name: string
    url: string
  }