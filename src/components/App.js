import React from 'react'
import { Switch, Route } from 'react-router-dom'
import gql from 'graphql-tag'
// import { Query } from 'react-apollo'
import { useQuery } from 'react-apollo-hooks';

import Profile from './Profile'
import Header from './Header'
import Login from './Login'

import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';

import { AUTH_TOKEN } from '../constants'

const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      id
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
      console.log("ERROR:", error)
       return <div>Error</div>
    }
    return (
      <Switch>
        <Route exact path="/" render={(props) => <Profile {...props} userId={data.currentUser.id} />} />
      </Switch>
    )
  }
}


const App = () => {
  // <Route exact path="/user/:name" component={CreateLink} />
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
