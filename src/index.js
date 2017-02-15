import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'
import Store from './store'
import Splash from './splash'

const rootEl = document.getElementById('root')
const path = window.location.hash.substr(1).split('/')

if (path.length < 2) { // pfft, who needs a router?
  ReactDOM.render(
    <Splash />,
    rootEl
  )
} else {
  const [ domain, table ] = path
  const store = new Store(domain, table)

  ReactDOM.render(
    <App store={store} />,
    rootEl
  )
}
