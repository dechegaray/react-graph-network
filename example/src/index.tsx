import React from 'react'
import ReactDOM from 'react-dom/client'

import { MyNetworkGraph } from './components/network-graph'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <MyNetworkGraph />
  </React.StrictMode>,
)
