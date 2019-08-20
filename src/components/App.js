import React from 'react'
import { Switch, Route } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks';

import Profile from './Profile'
import Header from './Header'
import Login from './Login'
import ErrorBoundary from './ErrorBoundary'

import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';

import { AUTH_TOKEN } from '../constants'

const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      id
      name
      image
      posts {
        id
        content
        deleted
        createdAt
        postedBy {
          name
          image
        }
      }
    }
  }
`

const LoadingStyle = css`
    margin: 0 auto;
    position: relative;
    left: 50%;
    top: 200px;
`;


const authToken = localStorage.getItem(AUTH_TOKEN);
const pathName = window.location.pathname;

const renderHeader = (data) => {

  const correctPath = pathName !== "/login" && pathName !== "/signup";
  const currentUser = data && data.currentUser ? data.currentUser : null;

  if(authToken && correctPath) {
    return (
      <Header authToken={authToken} user={currentUser} pathname={pathName} />
    )
  }
}

const renderApp = (data, loading, error) => {
  if (pathName === "/login" || pathName === "/signup"){
    return
  } else {
    if (loading) {
      return (
        <ClipLoader
          css={LoadingStyle}
          sizeUnit={"px"}
          size={50}
          color="#2582FF"
          loading={loading}
        />
      )
    }
    if (error) {
      return <div>Error, must login <a href="/login">login</a></div>
    }
    return (
      <ErrorBoundary>
        <Switch>
          <Route exact path="/" render={(props) => <Profile {...props} currentUser={data.currentUser} />} />
          <Route exact path="/:name" render={(props) => <Profile {...props} currentUser={data.currentUser} />} />
        </Switch>
      </ErrorBoundary>
    )
  }
}


const App = () => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY, {});

  return (
    <div >
      {renderHeader(data)}
      {renderApp(data, loading, error)}
      <Route exact path="/login" component={Login} />
    </div>
  )
}

export default App
