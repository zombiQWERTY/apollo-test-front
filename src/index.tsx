/// <reference types="webpack-env" />

import React, { ComponentType } from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'

import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './index.css'

import { App } from './App'
import { makeApolloClient } from './ApolloClient'
import { Router } from 'react-router-dom'
import { history } from './history'

if (!process.env.REACT_APP_ENDPOINT) {
  throw new Error('You must provide env.REACT_APP_ENDPOINT')
}

const render = (Component: ComponentType) => {
  return ReactDOM.render(
    <ApolloProvider client={makeApolloClient()}>
      <Router history={history}>
        <Component />
      </Router>
    </ApolloProvider>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept('./App', () => {
    const nextApp = require('./App').default
    render(nextApp)
  })
}
