import React, { ReactElement } from 'react'

import './page-api-loader.css'

export default function PageApiLoader(): ReactElement {
  return (
    <div className="meter">
      <span style={{width: "100%"}}></span>
    </div>
  )
}
