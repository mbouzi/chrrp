import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker';

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { ApolloProvider as ReactApolloHooksProvider  } from 'react-apollo-hooks';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'
import { setContext } from 'apollo-link-context'

import { AUTH_TOKEN } from './constants'


const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const options = {
  position: "bottom center",
  timeout: 2500,
  offset: '11px',
  transition: "fade", // or scale
  containerStyle: {
    background: "#3ABD7E",
    width: "35%",
    borderRadius: "36.6px",
    boxShadow: "0 4px 7px 0 rgba(0, 0, 0, 0.5)",
    color: "#FFF",
    height: "40px",
    marginTop: "20px",
    fontWeight: "500"
  }
}


const AlertTemplate = ({ message, style, options, close }) => (
  <div style={style}>
    <p className="close-button" onClick={close}>x</p>
    <p style={{marginLeft: "10px"}}>{message ? message : "Error! Please try again."}</p>
  </div>
)


ReactDOM.render(
  <BrowserRouter>
    <ReactApolloHooksProvider client={client}>
      <ApolloProvider client={client}>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </ApolloProvider>
    </ReactApolloHooksProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister();
