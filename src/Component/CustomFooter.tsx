import React from 'react'
import { FooterLight, ExternalLink } from 'epfl-elements-react'
import packageJson from '../../package.json'
import './CustomFooter.css'

const CustomFooter: React.FC = () => {
  return (
    <div className="footer-wrapper">
      <div className="version-container">
        <p>{packageJson.version}</p>
        <ExternalLink href="https://github.com/epfl-si/EPFL-News-Reader">
          <b>GitHub</b>
        </ExternalLink>
      </div>
      <FooterLight />
    </div>
  )
}

export default CustomFooter
