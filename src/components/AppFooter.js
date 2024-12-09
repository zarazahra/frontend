import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="index.hthttps://www.instagram.com/rs_abkml" target="_blank" rel="noopener noreferrer">
          RS ABK
        </a>
        <span className="ms-1">&copy; 2024</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="index.https://www.instagram.com/rs_abk" target="_blank" rel="noopener noreferrer">
          RS Anugerah Buda Khatuistiwa
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
