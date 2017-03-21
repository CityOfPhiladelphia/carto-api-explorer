import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'
import Store from './store'
import Splash from './splash'

const rootEl = document.getElementById('root')
const table = window.location.hash.substr(1)
const endpoint = process.env.REACT_APP_ENDPOINT

if (!table) { // pfft, who needs a router?
  ReactDOM.render(
    <Splash />,
    rootEl
  )
} else {
  const store = new Store(endpoint, table)

  ReactDOM.render(
    <App store={store} />,
    rootEl
  )
}
