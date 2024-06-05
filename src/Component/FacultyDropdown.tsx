import { Dropdown } from 'epfl-elements-react'
import { useNavigate, useParams } from 'react-router-dom'

interface Channel {
  id: number
  name: string
}

// Array of channel objects with id and name properties
const channels: Channel[] = [
  { id: 1, name: 'EPFL' },
  { id: 6, name: 'ENAC' },
  { id: 8, name: 'SB' },
  { id: 10, name: 'STI' },
  { id: 7, name: 'IC' },
  { id: 9, name: 'SV' },
  { id: 5, name: 'CDM' },
  { id: 4, name: 'CDH' },
]

const FacultyDropdown: React.FC = () => {
  const { viewType } = useParams()
  const navigate = useNavigate()

  // Handle change in faculty selection
  const handleFacultyChange = (option: string) => {
    const selectedChannel = channels.find(channel => channel.name === option) // Find the selected channel
    const pathSegments = window.location.pathname.split('/') // Split the current URL into segments
    const basePath = import.meta.env.DEV ? '' : '/EPFL-News-Reader'
    const langIndex = basePath ? 2 : 1 // Adjust index based on actual basePath position
    const currentLang = pathSegments[langIndex] || 'EN'
    const view = viewType || 'blog'

    // Navigate to the selected channel and view
    if (selectedChannel) {
      navigate(`/${currentLang}/${selectedChannel.id}/${view}`)
    } else if (option === 'None') {
      navigate(`/${currentLang}`)
    }
  }

  // Map channels to dropdown options and add 'None' option
  const channelOptions = channels.map(channel => ({ option: channel.name }))
  channelOptions.unshift({ option: 'None' })

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', marginBottom: '1rem', width: '100%' }}>
      <Dropdown
        label="Channel: "
        onChangeFn={handleFacultyChange}
        options={channelOptions}
      />
    </div>
  )
}

export default FacultyDropdown
