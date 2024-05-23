import { Error } from 'epfl-elements-react'

const NotFound = () => {
  return (
    <Error
      error={{
        message: 'Oops the page can not be found',
        status: 404
      }}
    />
  )
}

export default NotFound