import { Error, Content } from 'epfl-elements-react'

const NotFound = () => {
  const baseLink = import.meta.env.DEV ? '/' : '/EPFL-News-Reader/'
  return (
    <div style={{ marginTop: '10%' }}>
      <Error
        error={{
          message: 'Oops the page can not be found',
          status: 404
        }}
      />
      <Content>
        <h3 style={{ textAlign: 'center', marginTop: '20%' }}>
          Click <a href={`${baseLink}`}>here</a> to go to the main menu
        </h3>
      </Content>
    </div>
  )
}

export default NotFound
